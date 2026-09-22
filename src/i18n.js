// DentalCare Morocco: dynamic strings only.
//
// The site is three separate, fully server-rendered pages (/, /en/, /es/),
// each with its own translated markup baked in directly -- that's what
// search engines and no-JS visitors see. This file no longer swaps page
// content client-side; it only supplies the handful of strings needed
// AFTER load (the form's status message) and marks the active language
// in the switcher for assistive tech.
(() => {
    const DYNAMIC = {
        "en": {
            "f.sending": "Sending...",
            "f.success": "Thank you. We will reply with the next steps.",
            "f.error": "The request did not go through. Please try again."
        },
        "fr": {
            "f.sending": "Envoi en cours...",
            "f.success": "Merci. Nous vous répondrons avec les prochaines étapes.",
            "f.error": "La demande n'a pas abouti. Veuillez réessayer."
        },
        "es": {
            "f.sending": "Enviando...",
            "f.success": "Gracias. Le responderemos con los siguientes pasos.",
            "f.error": "No se pudo enviar la solicitud. Inténtelo de nuevo."
        }
    };

    // The page's own lang attribute is authoritative -- it was set server-side
    // to match its URL (/ = fr, /en/ = en, /es/ = es). No browser-language or
    // localStorage detection here: this page's content IS a specific language,
    // detection would just mismatch on-screen text against the URL and hreflang.
    const current = (document.documentElement.lang || 'en').slice(0, 2);
    const dict = DYNAMIC[current] || DYNAMIC.en;
    const t = (key) => (dict[key] !== undefined ? dict[key] : (DYNAMIC.en[key] !== undefined ? DYNAMIC.en[key] : key));

    window.DC = { t, get lang() { return current; } };
})();
