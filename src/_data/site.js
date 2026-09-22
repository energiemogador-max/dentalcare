// Site-wide constants. LAUNCH- prefixed values are placeholders -- see the
// LAUNCH CHECKLIST comment in src/_includes/layouts/base.njk. Do not remove
// or "fill in" a placeholder with a guess; grep -rn "LAUNCH-" must keep
// finding every one of these until the owner supplies the real value.
module.exports = {
  domain: "LAUNCH-DOMAIN",
  formId: "LAUNCH-FORM-ID",
  businessName: "DentalCare Morocco",
  themeColor: "#0E4A45",
  // The default/fallback language for x-default hreflang and untranslated
  // strings. French leads per docs/SEO-PLAN.md §0 market priority.
  defaultLang: "fr",
  languages: ["fr", "en", "es"],
  // Language-switcher labels. The abbreviation and endonym are NOT
  // translated per current page -- the original hand-written pages always
  // show the literal "FR"/"EN"/"ES" with an aria-label in that language's
  // own endonym, regardless of which language you're currently reading.
  langMeta: {
    fr: { abbr: "FR", endonym: "Français" },
    en: { abbr: "EN", endonym: "English" },
    es: { abbr: "ES", endonym: "Español" }
  }
};
