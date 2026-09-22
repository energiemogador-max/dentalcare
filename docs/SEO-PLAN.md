# SEO Expansion Plan

**Status:** plan only — nothing here is built yet.
**Written for:** the engineer/agent implementing this (Sonnet), plus the site owner making the business calls flagged as `[OWNER]`.
**Last updated:** 2026-09-22

---

## 0. Context this plan assumes

| Fact | Value |
|---|---|
| Business model | Agency brand, single partner clinic. **Not a clinic.** Never mark up or describe as one. |
| Channel | **Organic only.** No paid ads. No own Google Business Profile (the clinic owns theirs). |
| Market priority | 1. French (FR/BE/CH) · 2. Francophone Africa · 3. Spanish · 4. English |
| Current site | 3 static pages (`/`, `/en/`, `/es/`), ~700 words each, no build step |
| Domain | Not purchased. Recommended: `atlassmilemorocco.com`, brand **Atlas Smile** |
| Realistic timeline | Africa long-tail 4–10 wks · FR price long-tail 3–6 mo · FR head terms 9–18 mo |

**Why French first, not English:** Turkey owns English-language dental tourism with enormous content operations and a structural price advantage (implants £250–£700 vs UK £1,750–£3,500). Morocco barely registers in English SERPs. In French, Morocco has a moat Turkey cannot copy — shared language, 3-hour flights, diaspora, cultural familiarity — and the incumbent French competitors run dated sites.

---

## 1. `[OWNER]` Blocking decision: build system

This plan takes the site from 3 pages to **~70 French + ~25 English + ~25 Spanish ≈ 120 pages.** Hand-maintaining 120 static HTML files is not viable — one nav change means 120 edits, and drift is guaranteed.

**Recommendation: migrate to [Astro](https://astro.build).** Reasons specific to this project:

- Built-in i18n routing — solves the `/`, `/en/`, `/es/` structure natively
- `@astrojs/sitemap` auto-generates the sitemap **with hreflang**, removing an entire class of manual error
- Built-in image optimization (AVIF/WebP, responsive `srcset`) — directly serves the Core Web Vitals target, and the current site ships 2.4MB of images
- Ships zero JavaScript by default — ideal for a content site
- Outputs plain static HTML, so hosting stays trivial

**Cost:** adds a build step. If the build breaks, the site stops updating. Mitigated by deploying to **Cloudflare Pages or Netlify** (auto-build on push, build logs, instant rollback) rather than GitHub Pages.

**Alternative if the build step is unacceptable:** Eleventy (simpler, Nunjucks templates look like HTML). Worse image story.

> ⚠️ Do not start Phase 1 until this is decided. Everything downstream depends on it.

---

## 2. `[OWNER]` Two business inputs that block content

These cannot be coded around. The plan stalls without them.

**2.1 — Publish price ranges.** The single highest-intent keyword cluster in this niche is price queries (*prix implant dentaire maroc*). The site currently says "We don't publish fixed prices," which forfeits the entire cluster. Note the closest competitor, endurance-implant.com, also refuses fixed quotes — but still runs a pricing page with indicative ranges. **Ranges capture the search; the quote still happens over email.** Required: a "from €X" range per treatment, with a visible last-updated date.

**2.2 — Name the dentist.** Dental care is YMYL; Google applies its harshest quality bar. Competitors name their surgeons with universities and years of practice. Without a named, credentialed practitioner, E-E-A-T is capped no matter how good the content is. Required from the clinic partner:
- Full name, qualifications, university, years practising, licence/registration number
- Professional photo, photos of the actual premises and equipment
- Written permission to name them and to disclose the partnership

---

## 3. Site architecture (French — the primary tree)

Slugs below are informed by observed competitor SERPs, **not** validated volume data (the DataForSEO integration returned 401 and could not be used). Validate before committing slugs — see §10.

### Tier 1 — Treatment pillars
```
/implants-dentaires-maroc/
/facettes-dentaires-maroc/
/all-on-4-maroc/
/all-on-6-maroc/
/couronnes-dentaires-maroc/
/bridge-dentaire-maroc/
/blanchiment-dentaire-maroc/
/rehabilitation-complete-maroc/
```

### Tier 2 — Price cluster (highest commercial intent)
```
/prix/                              ← hub
/prix/implant-dentaire-maroc/
/prix/facettes-dentaires-maroc/
/prix/all-on-4-maroc/
/prix/couronne-dentaire-maroc/
/prix/bridge-dentaire-maroc/
/prix/blanchiment-maroc/
/devis-gratuit/                     ← conversion page
```

### Tier 3 — Comparison (intercepts traffic leaking to Turkey)
```
/maroc-ou-turquie/
/maroc-ou-hongrie/
/maroc-ou-espagne/
/implant-dentaire-maroc-vs-france/
/tourisme-dentaire-quel-pays-choisir/
```

### Tier 4 — Trust & objection (E-E-A-T core + best link magnets)
```
/qui-sommes-nous/                   ← explicit agency disclosure
/cabinet-partenaire/                ← named dentist, credentials, premises
/comment-ca-marche/
/garanties/
/suivi-apres-traitement/            ← aftercare once back in Europe
/risques-tourisme-dentaire/         ← honest risks piece
/temoignages/
/avant-apres/
```

### Tier 5 — Logistics
```
/sejour/
/vols-et-transferts/
/hebergement/
/duree-du-sejour/
/paiement-et-financement/
```

### Tier 6 — Geographic (the fast wedge — read §7 guardrails first)
```
/patients/france/      /patients/belgique/     /patients/suisse/
/patients/senegal/     /patients/cote-divoire/ /patients/gabon/
/patients/cameroun/    /patients/mali/         /patients/congo/
```

### Tier 7 — Guides / topical authority
```
/guides/                            ← hub
/guides/<20-30 articles>            ← see §6 for seed topics
```

### Legal (required for YMYL trust)
```
/mentions-legales/
/politique-de-confidentialite/
/conditions-generales/
```

**English & Spanish:** mirror only Tiers 1–4 (~25 pages each). Do **not** mirror Tier 6 or 7. Depth in French beats breadth across three thin languages.

---

## 4. Page-type specs

Every page ships with: unique `<title>` (≤60 chars), meta description (≤155), self-canonical, full hreflang cluster, `BreadcrumbList`, and at least 3 contextual internal links.

| Page type | Words | Must contain |
|---|---|---|
| **Treatment pillar** | 1,800–2,500 | What it is · candidacy · step-by-step procedure · materials/brands used · timeline & number of trips · price range + link to price page · risks · aftercare · 8–12 FAQ · named-dentist quote |
| **Price page** | 1,200–1,800 | Price table with ranges · what's included/excluded · **honest total-cost breakdown incl. flights & hotel** · comparison vs France/Belgium/Switzerland · payment methods · last-updated date · 8–12 FAQ |
| **Comparison** | 1,500–2,200 | Side-by-side table · price · flight time · language · regulatory framework · aftercare logistics · **an honest "choose the other one if…" section** · FAQ |
| **Trust/objection** | 800–1,500 | Specific, verifiable commitments. No marketing filler. |
| **Country page** | 900–1,400 | See §7 — unique substance mandatory |
| **Guide** | 1,200–2,000 | `Article` schema · named author · `reviewedBy` the dentist · published & modified dates |

**The highest-converting content in this niche is the objection cluster.** "What happens if an implant fails once I'm back in France?" is the #1 unspoken patient fear and almost nobody answers it properly. `/garanties/`, `/suivi-apres-traitement/` and `/risques-tourisme-dentaire/` are simultaneously the best conversion pages and the best link magnets. Prioritise them above the guides.

---

## 5. Schema spec

> ⚠️ **Never use `MedicalClinic` or `Dentist` for the agency.** Marking up an agency as a clinic is structured-data misrepresentation and is exactly the kind of thing that earns a manual action in YMYL. The clinic is a **separate entity** the agency is affiliated with.

**Sitewide (shared layout):**
```
TravelAgency  @id: {domain}/#organization
  ├─ name, url, logo, sameAs[], areaServed[], availableLanguage[fr,en,es,ar]
  └─ makesOffer → Service
```

**On `/cabinet-partenaire/` only:**
```
Dentist  @id: {domain}/cabinet-partenaire/#clinic
  ├─ name (clinic legal name), address (PostalAddress), telephone
  ├─ medicalSpecialty: Dentistry
  └─ founder/employee → Person { name, jobTitle, alumniOf, identifier: licence no. }
```
Link them: the `TravelAgency`'s offer carries `provider` → the `Dentist` `@id`.

**Per page type:**
- Treatment pillars → `Service` (`provider` = Organization, `areaServed`, `offers.priceRange`)
- Price pages → `AggregateOffer` (`priceCurrency`, `lowPrice`, `highPrice`) + `FAQPage`
- Comparison & trust pages → `FAQPage`
- Guides → `Article` with real `author` and `reviewedBy` → the dentist `Person` `@id`
- All non-home pages → `BreadcrumbList`

`reviewedBy` pointing at a credentialed named dentist is one of the strongest E-E-A-T signals available for YMYL content. Use it on every medical guide.

---

## 6. Guide seed topics

Chosen for informational intent that feeds the money pages. Each links to its pillar + price page.

1. Combien de temps dure un implant dentaire ?
2. Implant dentaire : douleur et anesthésie, à quoi s'attendre
3. Quels sont les délais entre pose de l'implant et couronne ?
4. Zircone ou céramique : quel matériau pour vos couronnes ?
5. Peut-on se faire poser des implants avec peu d'os ? (greffe osseuse)
6. Tourisme dentaire : la check-list avant de partir
7. Mutuelle et remboursement des soins dentaires à l'étranger
8. Facettes ou couronnes : comment choisir
9. Que faire si une couronne se descelle après le retour ?
10. Les marques d'implants : Nobel, Straumann, Anthogyr, Biotech — ce qui change
11. Combien de séjours faut-il pour un All-on-4 ?
12. Fumeurs et implants dentaires : quels risques
13. Diabète et implants : suis-je éligible ?
14. Comprendre un devis dentaire : ligne par ligne
15. Les questions à poser à une clinique dentaire à l'étranger

---

## 7. ⚠️ Guardrails — read before building Tier 6

The country pages are the fastest route to rankings **and** the fastest route to a penalty. Templated location pages that differ only by a swapped city name are **doorway pages**, explicitly against Google's spam policies.

**A country page may only ship if it contains all of:**
- Real flight routes, airlines and durations from that country to Marrakech/Casablanca
- Actual visa/entry requirements for that nationality entering Morocco
- Currency, realistic payment methods and any transfer constraints from that country
- Price comparison against **local** dental costs in that country
- At least one genuine testimonial from a patient of that nationality

**If you cannot write those five things truthfully, do not create the page.** Six real country pages outrank twelve templated ones, and carry none of the risk.

**Further hard rules:**
- **No fabricated testimonials, reviews, before/after photos or patient stories.** Ever. YMYL, and separately illegal in most target markets.
- No medical claim without attribution to the named dentist.
- No "clinic"/"clinique"/"clínica" language describing the agency.
- Prices always as ranges with "à partir de" + visible last-updated date. Never a guarantee.
- **Publish at 5–8 pages/week, not in one dump.** 70 pages appearing overnight on a two-week-old domain is a content-farm signal.
- Every page must be genuinely useful to a patient. If its only purpose is to hold a keyword, cut it.

---

## 8. Internal linking rules

- Every spoke links up to its hub; every hub links down to all its spokes
- Treatment pillar ⇄ matching price page, both directions, descriptive anchors
- Country pages → homepage, `/comment-ca-marche/`, relevant price page, `/vols-et-transferts/`
- Every guide → its pillar + one price page
- Every page → `/devis-gratuit/`
- No orphans: everything reachable within 3 clicks of `/`
- Descriptive anchor text, never "cliquez ici"
- Cap ~100 internal links per page

---

## 9. Technical requirements

- **Core Web Vitals targets:** LCP < 2.0s · INP < 200ms · CLS < 0.05
- **Self-host the fonts.** Currently Google Fonts, render-blocking third-party — see `index.html`
- Images: AVIF with WebP fallback, responsive `srcset`, explicit `width`/`height`, lazy below fold, `fetchpriority="high"` on the LCP image only
- Auto-generated sitemap, split per language, with hreflang; `robots.txt` referencing it
- Custom 404
- 301 redirect map maintained if any slug changes post-launch
- Replace every `LAUNCH-DOMAIN` and `LAUNCH-FORM-ID` placeholder at launch (`grep -rn "LAUNCH-"`)
- Verify all three hreflang clusters are reciprocal after migration

---

## 10. Validation task (do this first)

The keyword targets above are inferred from competitor SERP structure, not measured volume. **The DataForSEO MCP integration returns HTTP 401 — it is not authenticated.** Either fix those credentials or use another source to validate, before slugs are locked:

- Confirm search volume and difficulty for each Tier 1/2 slug in **France**, **Belgium**, **Switzerland**, **Senegal**, **Côte d'Ivoire**
- Confirm the head term is `implant dentaire maroc` vs `implants dentaires maroc` (singular/plural changes the slug)
- Pull the actual top-10 for the 10 highest-value terms and check page type — if Google returns listicles rather than service pages, the page type must match

Slugs are expensive to change after indexing. Validate, then build.

---

## 11. Off-page (the only authority lever, given organic-only)

- **Directory listings:** Dentavacation, MedicalTourismCo, Meilleure Clinique, Bookimed, Dental Departures. ⚠️ Several charge for placement — confirm cost before treating as free.
- **Trustpilot** — the review asset the brand *can* own, since Google reviews land on the clinic's profile
- **Francophone expat communities** — forums and groups for French nationals abroad and for the Moroccan diaspora
- **Original data as a link magnet:** an annual "Indice des prix du tourisme dentaire" comparing real quoted prices across Morocco/Turkey/Hungary/France with a stated methodology. This is what earns editorial links in this niche; pure service pages do not.
- **Partner clinic cross-link** — ask them to link the agency from their own site

---

## 12. Sequencing

| Phase | Contents | Gate to start |
|---|---|---|
| **0** | Buy domain · Astro migration · shared layout · schema base · fonts self-hosted · deploy pipeline | §1 decided |
| **1** | Tier 4 trust cluster + legal pages | §2.2 dentist details in hand |
| **2** | Tier 1 treatment pillars | Phase 0 done |
| **3** | Tier 2 price cluster | §2.1 price ranges approved |
| **4** | Tier 6 country pages (only those passing §7) | Real testimonials exist |
| **5** | Tier 3 comparison pages | Phase 2–3 done |
| **6** | Tier 7 guides, 5–8/week | ongoing |
| **7** | EN + ES mirrors of Tiers 1–4 | French cluster stable |

Phase 1 leads deliberately: the trust cluster is both the E-E-A-T foundation everything else inherits and the highest-converting content on the site.

---

## 13. Measurement

- Google Search Console — verify and monitor **per language directory** separately
- GA4 with conversion tracking on the quote form
- Rank tracking: ~50 French terms, segmented by country (France vs Senegal SERPs differ substantially)
- Monthly review: indexed pages, impressions by cluster, quote-form conversions by landing page
- **Watch for index bloat** — if pages are indexed but get zero impressions after 90 days, they are thin. Improve or remove them.

---

## 14. Definition of done, per page

- [ ] Unique title ≤60 chars, meta description ≤155
- [ ] Self-canonical + reciprocal hreflang cluster
- [ ] Correct schema for its type, validated in Rich Results Test
- [ ] Word count meets §4
- [ ] ≥3 contextual internal links out, ≥1 in from its hub
- [ ] All images AVIF/WebP with dimensions and meaningful alt text
- [ ] Mobile Lighthouse ≥90 performance, 100 accessibility
- [ ] No `LAUNCH-` placeholders
- [ ] Medical claims attributed to the named dentist
- [ ] Nothing describes the agency as a clinic
