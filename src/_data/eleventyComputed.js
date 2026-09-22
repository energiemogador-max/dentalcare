// Eleventy Computed Data: values derived from the data cascade, resolved
// per page. Collections are NOT available here (they're assembled after
// the data cascade), so the hreflang cluster / language switcher is built
// in the layout template instead (src/_includes/layouts/base.njk), using
// the byTranslationKey/findByLang/sortByLangOrder filters from .eleventy.js.
module.exports = {
  // The resolved content dictionary for this page's language. Only pages
  // that set `lang` in front matter (the actual content pages) get one;
  // utility templates like sitemap.njk simply won't have `t`.
  t: (data) => (data.lang ? data.i18n[data.lang] : undefined),

  // Sitewide TravelAgency schema (docs/SEO-PLAN.md §5). Never
  // MedicalClinic/Dentist here -- that's the partner clinic, a separate
  // entity added in Phase 1.
  orgSchema: (data) => {
    if (!data.lang) return undefined;
    const t = data.i18n[data.lang];
    const domain = data.site.domain;
    const orgId = `https://${domain}/#organization`;
    return {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": orgId,
      name: data.site.businessName,
      url: `https://${domain}/`,
      // No raster logo asset exists yet (only the inline SVG star mark in
      // the header) -- stand in with the one real brand image the site
      // ships until a proper logo file is supplied at launch.
      logo: `https://${domain}/images/og-share.jpg`,
      areaServed: ["Morocco"],
      availableLanguage: ["fr", "en", "es", "ar"],
      sameAs: [],
      makesOffer: t.treatments.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.h3 },
        provider: { "@id": orgId }
      }))
    };
  },

  // BreadcrumbList support, ready for Phase 1+ non-home pages. A page opts
  // in by setting `breadcrumbs: [{ name, url }, ...]` in its front matter;
  // the homepage pages deliberately don't set this (Google recommends
  // omitting breadcrumbs on the homepage itself).
  breadcrumbSchema: (data) => {
    if (!data.breadcrumbs || !data.breadcrumbs.length) return undefined;
    const domain = data.site.domain;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `https://${domain}${crumb.url}`
      }))
    };
  }
};
