// Loads the per-language content dictionaries (src/_data/i18n/*.json) and
// exposes them keyed by language code, e.g. i18n.fr, i18n.en, i18n.es.
//
// These JSON files hold the hand-verified French/English/Spanish copy
// extracted verbatim from the original static pages. Do not retranslate,
// paraphrase or "improve" any string in them -- see docs/SEO-PLAN.md.
module.exports = {
  fr: require("./i18n/fr.json"),
  en: require("./i18n/en.json"),
  es: require("./i18n/es.json")
};
