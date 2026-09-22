# DentalCare Morocco

Marketing site for a Morocco-based dental tourism **agency** (not a clinic
-- see `docs/SEO-PLAN.md` §5). Built with [Eleventy](https://11ty.dev).

## Quick start

```
npm install
npm run build     # writes the static site to _site/
npm start         # local dev server with live reload
```

`_site/` is the build output. It is gitignored and never hand-edited --
everything in it is generated from `src/`.

## Project structure

```
src/
  _data/
    site.js            site-wide constants (domain, form ID, business name...)
    eleventyComputed.js per-page computed values (t, orgSchema, breadcrumbSchema)
    i18n.js             loads the three language dictionaries below
    i18n/{fr,en,es}.json  hand-verified body copy, one file per language
  _includes/layouts/
    base.njk            the ONE shared layout every page renders through
  index.njk              French homepage      -> /
  en/index.njk            English homepage     -> /en/
  es/index.njk             Spanish homepage      -> /es/
  sitemap.njk             generates sitemap.xml from the `pages` collection
  styles.css, scripts.js, i18n.js, robots.txt, images/, fonts/
    passthrough/source assets -- see .eleventy.js

eleventy/
  relative-url.js        the relative-path helper every asset/nav href uses
  image-shortcode.js     @11ty/eleventy-img wrapper (AVIF + WebP + srcset)

.eleventy.js              Eleventy config: collections, filters, shortcodes,
                           passthrough copies, input/output dirs
```

## The `translationKey` convention

Every page that should appear in the language switcher, get a reciprocal
`hreflang` cluster in its own `<head>`, and show up correctly grouped in
`sitemap.xml` MUST set three things in its front matter:

```yaml
lang: fr              # this page's own language: fr | en | es
translationKey: home  # shared by every language version of "the same" page
tags:
  - page               # opts this page into the `pages` collection
```

The three current homepages all share `translationKey: home`. A Phase 1+
page -- say, the French/English/Spanish versions of the implants treatment
pillar -- would each set `translationKey: implants-pillar` (or similar) on
all three language variants and nothing else changes: the layout's
hreflang block, the language switcher, and `sitemap.njk` all derive
themselves from `collections.pages` grouped by this key. **Do not
hand-write a new hreflang cluster** -- if it isn't showing up, check the
front matter, not the layout.

Body copy itself lives in `src/_data/i18n/{fr,en,es}.json`, structured to
mirror the page sections 1:1 across languages. When adding a new
non-homepage template, follow the same pattern: give it a data file (or a
namespaced section of one) per language, and pull every string through it
-- never hardcode copy into a `.njk` template.

## Relative asset paths -- do not change this

The site is deployed to unknown/varying paths (a GitHub Pages project
subpath during preview, `file://` when opened directly, and eventually a
real domain root). Root-relative paths (`/styles.css`) broke both GitHub
Pages subpath preview and direct file opening once already -- see commit
`f327458`. Every asset, nav and language-switcher href goes through the
`relUrl` filter (`eleventy/relative-url.js`), which computes a real
relative path between the current page and its target. **Never write a
hardcoded `../` or a leading `/` path in a template** -- use `relUrl` (or,
for images, the `image` shortcode, which uses the same helper internally)
so it keeps working automatically as pages are added at new depths.

## Images

Use the `image` shortcode, not a raw `<img>` tag:

```njk
{% image "some-photo.webp", "Descriptive alt text", { pageUrl: page.url, sizes: "100vw" } %}
```

It emits a `<picture>` with AVIF + WebP sources, a responsive `srcset`,
explicit `width`/`height`, `loading="lazy"` by default, and `decoding="async"`.
Pass `fetchpriority: "high"` and `loading: null` only for the actual LCP
image on a page (there should be exactly one). Source images live in
`src/images/`; optimized variants are generated into `_site/images/optimized/`
at build time and are not committed.

## Schema

The shared layout emits `TravelAgency` JSON-LD (`@id: {domain}/#organization`)
on every page. **Never emit `MedicalClinic` or `Dentist` for the agency** --
the partner clinic is a separate entity, added as its own `Dentist` entry
in Phase 1 (`docs/SEO-PLAN.md` §5). A page can opt into `BreadcrumbList`
schema by setting `breadcrumbs: [{ name, url }, ...]` in its front matter;
the homepages deliberately don't (Google recommends omitting breadcrumbs
on the homepage itself).

## `LAUNCH-` placeholders

`grep -rn "LAUNCH-" src/ _site/` finds every placeholder that must be
replaced before going live:

- `LAUNCH-DOMAIN` -- the real domain, set in `src/_data/site.js`
- `LAUNCH-FORM-ID` -- the Formspree form ID, set in `src/_data/site.js`
  (until then, `scripts.js` blocks submission and shows a visible error
  instead of silently losing a lead)
- `LAUNCH-SOCIAL` -- a comment in the layout marking where to wrap the
  footer's Instagram/Facebook/LinkedIn names in real links once the
  profiles exist

## Deploying

### Right now: GitHub Pages via Actions

The Eleventy migration removed the hand-written `index.html` from the repo
root and generates pages into `_site/`, which is gitignored. GitHub Pages
only auto-builds Jekyll, **not** Eleventy -- so without a build step a push
would leave Pages with nothing to serve.

`.github/workflows/deploy.yml` handles this: it builds on every push to
`main` and publishes `_site/`.

> ## ⚠️ REQUIRED ONE-TIME SETTING
>
> **Settings -> Pages -> Build and deployment -> Source: "GitHub Actions"**
>
> It currently reads "Deploy from a branch". While it does, GitHub ignores
> the workflow below and instead runs **its own Jekyll builder** against this
> repo. That build **fails**, because Jekyll cannot parse Nunjucks:
>
> ```
> Build Warning: Layout 'layouts/base.njk' ... does not exist
> Liquid Exception: Liquid syntax error (line 11): Unknown tag 'set'
>                   in src/sitemap.njk
> ```
>
> Those errors are not a bug in the site -- the Eleventy build succeeds
> locally and in the workflow. They are Jekyll being pointed at a
> non-Jekyll project. Changing the Source setting stops the Jekyll builder
> running at all.
>
> The workflow passes `enablement: true` to `actions/configure-pages`, which
> asks the API to make this change automatically. That may lack permission
> depending on repo settings, so treat the manual switch as the real fix.

Project Pages sites serve from a `/reponame/` subpath. All asset and
navigation paths are relative, so this works without configuration -- do not
"fix" them to root-relative paths, that breaks subpath hosting (and opening
files directly).

### At launch: Cloudflare Pages or Netlify

No hosting account has been created or authenticated as part of this
change -- there is no domain yet either. This repo ships config for both
recommended targets (`docs/SEO-PLAN.md` §1 -- preferred over GitHub Pages
for the real launch, so a broken build stops the site updating instead of
silently going stale). Once one is connected, `deploy.yml` can be deleted.

**Netlify** (`netlify.toml` at the repo root): connect the repo in the
Netlify dashboard; it auto-detects the build command (`npm run build`) and
publish directory (`_site`) from `netlify.toml`. Set the site's custom
domain once `LAUNCH-DOMAIN` is decided.

**Cloudflare Pages**: connect the repo in the Cloudflare dashboard and set
build command `npm run build`, build output directory `_site`, and Node
version `20` (also pinned in `.node-version`). `wrangler.toml` is provided
for CLI-based deploys (`npx wrangler pages deploy`) but a dashboard-connected
Git project uses its own dashboard settings instead.

Either way: after connecting, replace every `LAUNCH-` placeholder (see
above) before pointing the real domain at it.
