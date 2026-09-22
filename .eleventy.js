"use strict";

const { relativeUrl } = require("./eleventy/relative-url.js");
const imageShortcode = require("./eleventy/image-shortcode.js");

module.exports = function (eleventyConfig) {
  // ---------------------------------------------------------------------
  // translationKey convention (see docs/SEO-PLAN.md §1 and §9)
  //
  // Every page that should appear in the language switcher, the per-page
  // hreflang cluster and sitemap.xml MUST set, in its front matter:
  //   lang: "fr" | "en" | "es"        -- this page's own language
  //   translationKey: "<stable-id>"   -- shared by every language version
  //                                      of "the same" page
  //   tags: ["page"]                  -- opts the page into the `pages`
  //                                      collection that drives all three
  //
  // The three current pages all use translationKey "home". A Phase 1+
  // treatment pillar would use e.g. translationKey: "implants-pillar" on
  // its fr/en/es variants. Everything else (sitemap.njk, the <head>
  // hreflang block and the language switcher in
  // src/_includes/layouts/base.njk) derives itself from this -- do not
  // hardcode a new hreflang cluster by hand.
  // ---------------------------------------------------------------------
  eleventyConfig.addCollection("pages", (collectionApi) =>
    collectionApi.getFilteredByTag("page")
  );

  // Relative-path helper (see eleventy/relative-url.js for why this exists).
  // Template usage: {{ "/styles.css" | relUrl(page.url) }}
  //   -> relativeUrl(fromUrl=page.url, toUrl="/styles.css")
  eleventyConfig.addFilter("relUrl", (toUrl, fromUrl) => relativeUrl(fromUrl, toUrl));

  // translationKey helpers used by src/_includes/layouts/base.njk and
  // src/sitemap.njk to build the hreflang cluster / language switcher.
  eleventyConfig.addFilter("byTranslationKey", (pages, key) =>
    (pages || []).filter((p) => p.data && p.data.translationKey === key)
  );
  eleventyConfig.addFilter("findByLang", (pages, langCode) =>
    (pages || []).find((p) => p.data && p.data.lang === langCode)
  );
  eleventyConfig.addFilter("sortByLangOrder", (pages, order) => {
    const list = (pages || []).slice();
    list.sort((a, b) => order.indexOf(a.data.lang) - order.indexOf(b.data.lang));
    return list;
  });
  // Groups a flat page collection into { translationKey: [pages...] },
  // each list pre-sorted by site.languages. Used by sitemap.njk so every
  // <url> can emit its full alternate cluster in one pass.
  eleventyConfig.addFilter("groupByTranslationKey", (pages, order) => {
    const groups = new Map();
    for (const p of pages || []) {
      const key = p.data && p.data.translationKey;
      if (!key) continue;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    }
    for (const list of groups.values()) {
      list.sort((a, b) => order.indexOf(a.data.lang) - order.indexOf(b.data.lang));
    }
    return [...groups.values()];
  });

  // @11ty/eleventy-img shortcode -- AVIF + WebP, responsive srcset.
  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  // Static passthrough copies -- unchanged files served as-is.
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "src/scripts.js": "scripts.js" });
  eleventyConfig.addPassthroughCopy({ "src/i18n.js": "i18n.js" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/images/og-share.jpg": "images/og-share.jpg" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
