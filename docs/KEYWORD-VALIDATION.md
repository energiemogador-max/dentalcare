# Keyword & Slug Validation Findings

**Status:** research only — no site code touched. Validates §3 of `docs/SEO-PLAN.md` before slugs are locked.
**Method:** DataForSEO (attempted, failed) + structural SERP reconnaissance via WebSearch/WebFetch.
**Date:** 2026-09-22

---

## 1. DataForSEO status

**Still HTTP 401 (unauthenticated).** One test call — `dataforseo_labs_google_keyword_overview` for `implant dentaire maroc`, France/fr — failed identically to the earlier session. No volume, difficulty, or CPC data was available at any point in this task. Every number below that looks like "volume" is a **competitor-stated price or business figure**, never a search-volume estimate — none is invented.

---

## 2. Method and its limits

**Used:** WebSearch (7 queries covering Tier 1/2 head terms, comparisons, Africa) + WebFetch on 8 competitor URLs (endurance-implant.com nav + pricing, dentistmaroc.com, esthetiquedentairemarrakech.com x2, dentiste.co.ma, evitalink.com's Senegal guide).

**Hard limit — read this before trusting anything below:** the WebSearch tool is **US-localized**. It cannot reproduce what Google actually shows a browser in Paris, Dakar, or Brussels. Concretely, this means:
- **Ranking order is not trustworthy.** I can tell you *who appears* in a US-run query for a French phrase, not *who ranks #1–10* for a user in France. Treat every "top domains" list below as a **set of real, relevant competitors**, not a leaderboard.
- **True French/Senegalese SERP features (People Also Ask, local pack, forum threads ranking higher than they did here) are invisible to me.** Two genuine forum threads (expat.com, yabiladi.com) surfaced anyway, which suggests forums *do* compete for some of these terms in the real SERP — likely more than what I saw.
- **Aggregators may be under-represented for locale reasons, not because they're actually absent.** Dentavacation, Bookimed, MedicalTourismCo, Meilleure Clinique, Dental Departures — named in §11 — appeared **zero times** across every query I ran, including a query naming them directly. This could mean they genuinely don't compete hard in French-language Morocco-dental SERPs (plausible — they skew English/Turkey-Hungary), or it could mean the US-localized tool simply isn't showing them. I cannot distinguish these two explanations. **Flagged as unresolved, not as a finding.**

Where WebFetch hit a specific competitor URL directly, that data is solid (it's not localization-dependent) — nav structure, on-page pricing, currency, page sections. Where I relied on WebSearch result titles/URLs, treat it as directional.

---

## 3. Per-slug findings table

### Tier 1 — Treatment pillars

| Proposed slug | Observed dominant page type | Singular/plural verdict | Recommended action |
|---|---|---|---|
| `/implants-dentaires-maroc/` | Matches plan. Overwhelmingly clinic service pages + "Guide Complet 2025/2026" style blog guides answering what/how-much/risk. No listicles or forum threads reached top results for the bare term. | **Genuinely mixed, ~50/50.** Singular ("implant dentaire maroc") turns up more in price-suffixed titles; plural more in category-defining titles ("Implants dentaires au Maroc: la solution définitive"). No consensus. | **Needs real volume data.** This is the single highest-value term in the plan — worth spending real DataForSEO/GSC/Keyword Planner credit on before locking. Do not guess on this one. |
| `/facettes-dentaires-maroc/` | Matches plan. Clinic service+price pages; one exact-match domain (`facettes-dentaires.ma`) exists, which is itself a signal this is a real head term. | **Plural favored.** The exact-match domain, plus centredentairekandil, esthetiquedentairemarrakech and estheticaplus all title with "facettes dentaires" plural. Singular seen on 2 smaller sites. | **Keep** plural slug as proposed. |
| `/all-on-4-maroc/` `/all-on-6-maroc/` | Matches plan exactly. **Direct exact-slug matches found** on a live competitor: `cliniquedentaire-amrani.com/all-on-4-maroc/` and `/all-on-6-maroc/`. | N/A (numeral compound, no plural form). | **Keep as-is.** Most confidently validated pair in the whole plan. |
| `/couronnes-dentaires-maroc/` | Matches plan (service+price hybrid pages dominate; competitors mostly fold pricing into the same page rather than splitting pillar/price). | **Singular dominates strongly.** Domain `couronnedentaire.ma` itself is singular; nearly every ranking title says "couronne dentaire au Maroc" (singular). Only one plural title seen. | **Change to singular: `/couronne-dentaire-maroc/`.** Note this also fixes an internal inconsistency — §3 Tier 2 already uses singular (`/prix/couronne-dentaire-maroc/`) while Tier 1 uses plural. Align both to singular. |
| `/bridge-dentaire-maroc/` | Matches plan. Consistently combined guide+price pages (see §6). | **Singular confirmed strongly** across 5+ competitor titles/slugs. | **Keep as-is.** Well validated. |
| `/blanchiment-dentaire-maroc/` | Matches plan. Clinic + blog guide pages, prices in ranges throughout. | No plural issue, but two co-dominant phrasings exist: "blanchiment dentaire" and "blanchiment des dents" — both common. | **Keep** "blanchiment dentaire" as the head phrase (slightly more common as an exact head term), but see Tier 2 note below — the plan's price-page slug drops "dentaire" inconsistently. |
| `/rehabilitation-complete-maroc/` | **No competitor targets this as a standalone pillar.** It appears only as (a) a case-study/portfolio post under an existing implant clinic's site, or (b) synonymous phrasing "réhabilitation orale globale" / "réhabilitation totale de la mâchoire" used as a subsection of All-on-4/All-on-6 content — never its own keyword-targeting page. | N/A | **Drop as a standalone Tier 1 pillar.** Nobody competes on this exact phrase independently of All-on-4/All-on-6. Fold it into a short comparison/hub page ("All-on-4 vs All-on-6 vs bridge/couronnes multiples — quelle réhabilitation choisir ?") or a guide article, not a full 1,800–2,500-word pillar with its own price-page ambitions. Building it as proposed risks cannibalizing the All-on-4/6 pillars for the same searchers. |

### Tier 2 — Price cluster

| Proposed slug | Observed dominant page type | Notes | Recommended action |
|---|---|---|---|
| `/prix/` (hub) | **No direct competitor equivalent found.** Endurance has a `/tarifs/` page but it's Hungary-only, not a cross-treatment hub; everyone else scatters pricing across per-treatment posts. | Ambiguous: could be a genuine UX/internal-linking differentiator, or a sign nobody searches for a generic price index (users query per-treatment: "prix implant," not "prix" alone). | **Keep as internal hub**, but treat it as structural infrastructure (internal linking, the §11 "Indice des prix" link-magnet home) rather than a page expected to rank for a head term on its own. |
| `/prix/implant-dentaire-maroc/` | **Confirmed norm.** Dedicated price pages are standard (`cliniquelacolline.com/implant-dentaire-maroc-prix/`, `centredentairekandil.com/prix-des-implants-dentaires-au-maroc-2026-...`). Actual numbers published almost universally: 7,000–12,000 MAD typical single implant, up to 15,000–18,000 MAD by brand. | Same singular/plural ambiguity as the Tier 1 pillar — align both once real data resolves it. | **Keep**, pending Tier 1 resolution. |
| `/prix/facettes-dentaires-maroc/` | Confirmed — dedicated price pages standard, MAD ranges published (2,500–8,000 MAD/tooth by material). | — | **Keep.** |
| `/prix/all-on-4-maroc/` | Confirmed — direct match `cliniquelacolline.com/all-on-4-prix-maroc/` (note: flat URL, not nested under a `/prix/` folder). MAD (35,000–60,000 MAD) and EUR ("à partir de 5 000 €") both used — see §6. | Competitors more often use flat, non-nested price URLs than a `/prix/` subfolder. | **Keep concept**; nested `/prix/` architecture is fine for our breadcrumbs/hub structure even though it's not the majority competitor pattern. |
| `/prix/couronne-dentaire-maroc/` | Confirmed, already singular — direct match `cliniquelacolline.com/prix-couronne-dentaire-au-maroc/`. MAD prices 2,000–6,000 by material. | This is the slug the plan should also use for Tier 1 (see above). | **Keep.** |
| `/prix/bridge-dentaire-maroc/` | Confirmed. Note: most competitors don't split bridge pillar/price at all — `centredentairekandil.com/bridge-dentaire-au-maroc/` covers both in one page. MAD 2,000–15,000 (wide range, complexity-dependent). | Splitting into two pages (pillar + price) is a plan choice not mirrored by competitors, who consolidate. Not necessarily wrong, but expect more direct competition from consolidated pages. | **Keep**, but consider whether bridge specifically deserves the full split treatment given nobody else does it this way. |
| `/prix/blanchiment-maroc/` | Confirmed page type, but **slug inconsistency**: this drops "dentaire" while the Tier 1 pillar keeps it, and the dominant competitor pattern keeps it too (`dentiste.co.ma/prix-blanchiment-dentaire-au-maroc/`). | MAD prices 1,200–7,000 depending on method. | **Change to `/prix/blanchiment-dentaire-maroc/`** for internal consistency and competitor-pattern match. |
| `/devis-gratuit/` | **Not found as a standalone ranking page anywhere.** "Devis gratuit" appears universally as a CTA/form embedded on every clinic's existing pages, never as its own indexed destination competing for that phrase. | — | **Keep the page** (it's required as the §8 universal internal-link target and conversion destination), but **do not budget it as an acquisition/keyword page.** Its job is conversion infrastructure, not ranking. |

---

## 4. Competitor architecture map

Fetched: `endurance-implant.com` (full nav + pricing page), `dentistmaroc.com`, `esthetiquedentairemarrakech.com` (2 pages), `dentiste.co.ma`, plus `evitalink.com` (not originally on the fetch list, but became essential — see §5).

| Site | Business model | Architecture | What they have that we don't | What we have that they don't |
|---|---|---|---|---|
| **endurance-implant.com** | Agency, not clinic — closest same-vertical analog. **Hungary-primary, Morocco is a secondary tab.** Names two Moroccan dentists with university + years of practice + Nobel Biocare certification. | Nav = IMPLANT (treatment + price + extraction + graft + prosthesis sub-pages) → PROTHÈSE (couronne/bridge variants/all-on-4-6) → **CLINIQUES organized by destination country** (Hongrie, Maroc) → PRIX (Hungary only) → DÉMARCHES → Devis. | A `/tarifs/` hub — but only for Hungary; their **Morocco pricing is thin and embedded in blog posts, not a structured price cluster.** This is a real gap: the strongest agency competitor has NOT built out Morocco pricing depth. It's an opening, not a wall. | Everything in Tier 4 (trust/objection cluster) and Tier 6 (patient-origin pages) — Endurance's nav has no visible `/garanties/`, `/risques/`, testimonials, or nationality-specific pages at all. Their architecture organizes by **destination country**, never by **patient's home country** — the opposite axis from our Tier 6. |
| **esthetiquedentairemarrakech.com** | Single private clinic (Dr. Hafça Moqadem), not an agency — not a direct architecture template for us, but a direct SERP competitor for treatment/price terms. | About/dentist bio → Treatments → Tourisme dentaire → Testimonials → Press → Contact. | Testimonials + "Revue de presse" as a trust signal. | Named dentist has **no formal credentials shown** (no university, no license number) — exactly the E-E-A-T gap §2.2 is designed to close. If we get real credentials from the partner clinic, we out-credential this competitor directly. |
| **dentiste.co.ma** / **dentistmaroc.com** | Morocco-wide dentist-finder **directories/marketplaces**, not single-clinic agencies — different business model, not an architecture template, but they do rank. | Organized primarily by **city** (Casablanca, Marrakech, Tangier, Rabat, 30+ cities) and treatment, with blog price-guides per city. No single dentist is credentialed — many practices listed generically. | **City-level pages** — a pattern used by both directories that our plan has zero of. | Depth per treatment/price page — directories are thin aggregation layers, not deep content. |
| **evitalink.com** | **Multi-vertical medical tourism agency** (dental is one line of business alongside cosmetic surgery etc.), Morocco-based, "plateforme qui met en relation des patients internationaux avec des établissements médicaux certifiés." | See §5 — this is the one site that already builds patient-origin-country pages. | See §5. | Dental-only focus/depth — Evitalink's dental content is one vertical among several; a dental-only agency can plausibly out-depth them on dental specifically. |

**Net read:** nobody in this set combines (a) deep per-treatment price pages, (b) a real named/credentialed dentist, (c) an honest objection/trust cluster, and (d) patient-origin-country pages, all under one Morocco-first dental-only agency. Each competitor has one or two of these pillars, not all four. That combination is the plan's actual white space — not any single slug.

**Page types nobody in this set has, that could be genuine opportunities (or genuine signs of no demand — can't tell without volume data):**
- An explicit **visible "last updated" date stamp** on price pages — every price page I checked (esthetiquedentairemarrakech, endurance) showed none, despite freshness being a stated YMYL signal. Cheap differentiator if real.
- An **annual cross-country price index** ("Indice des prix du tourisme dentaire," §11) — no competitor publishes anything like this. Genuine greenfield, consistent with the plan's own framing.
- A **self-critical, agency-authored risks page** — the only risk-skeptical content found was third-party (a Moroccan medical-association article questioning dental-tourism agencies generally, `mac.ma`), not published by any agency about itself. Supports the plan's claim that the objection cluster is underserved, though this is a single data point.

---

## 5. Francophone Africa spot-check (Tier 6)

**§3's claim that this is an under-served wedge needs revision — it is contested, not empty.**

`evitalink.com` surfaced in **every single query** I ran that touched Senegal, Côte d'Ivoire, Cameroun, or Gabon — including generic ones that didn't name them. Direct fetch of their Senegal page confirmed it is **not thin or templated**:
- Pricing tables for 11 procedures in MAD/EUR, with a direct Dakar-vs-Casablanca cost comparison
- Real flight times ("3h de vol depuis Dakar"), visa status, budget breakdowns (€1,100–€4,870 all-in examples)
- **Three named testimonials** with city and treatment specifics (Dakar, Abidjan, Douala)
- A further search confirmed dedicated guides also exist for **Cameroun, Gabon, Guinée Conakry**, plus landing pages for **Côte d'Ivoire and Mauritanie**

This page independently satisfies all five of §7's guardrail requirements (real flights, real visa info, currency/payment, local-cost comparison, genuine testimonials) — meaning the strongest evidence for §7's guardrail design is that **a real competitor is already executing exactly that recipe successfully.** The guardrails are validated; the "nobody's doing this" framing is not.

**One self-reported data point worth weighing carefully** (Evitalink's own marketing claim, not independently verified): they state dental care is 28% of their Sub-Saharan Africa quote requests, split single implants 34% / full rehabilitations with crowns 28% / veneers 19% / orthodontics 12%. If even directionally true, it confirms implants + crown rehabilitation + veneers are the right treatment priority for this segment — consistent with the plan's existing Tier 1 order.

**Countries where I found no dedicated competitor content:** **Mali and Congo** were not mentioned in Evitalink's stated country coverage (Senegal, Côte d'Ivoire, Cameroun, Gabon, Mauritanie, Guinée Conakry were). No competitor content found targeting Malian or Congolese patients specifically in any query. This is a real "no competitor content found" result for those two — genuinely weaker signal (could mean no demand, could mean nobody's bothered yet) but it is the one part of Tier 6 that remains closer to the original "empty wedge" framing.

**Practical implication for §3/§7:** Senegal, Côte d'Ivoire, Cameroun, and Gabon pages will be competing directly against a well-resourced, already-live page that meets our own guardrail bar. Mali and Congo appear more open but with much weaker evidence either way.

---

## 6. Price-page reality check (§2.1)

- **Actual numbers, not vague ranges, are the norm.** Every price-intent page fetched or summarized published real figures — nobody hides behind "contact us for pricing." This directly confirms §2.1's core argument: refusing to publish ranges is a real competitive gap, not a defensible norm.
- **Currency splits by who's talking, not by treatment.** Moroccan clinics selling to a Moroccan/mixed audience quote in **MAD** almost without exception (dentiste.co.ma, dentistmaroc.com, esthetiquedentairemarrakech.com, couronnedentaire.ma, etc.). The two **agencies** whose primary audience is French/European patients (Endurance for Hungary, and Morocco pricing where it exists; Evitalink for Morocco) quote in **EUR**, formatted as "à partir de X €." Since our business is an agency selling to French patients, **EUR "à partir de" framing is the closer analog**, not the MAD convention that a naive scan of "Morocco dental clinics" would suggest.
- **Year-stamped titles ("... 2026")** are extremely common as a freshness signal, but an **explicit on-page "last updated" date element** is not — none of the fetched pages had one. Matches the §4 requirement; it's a real (if currently unclaimed) differentiator, not table stakes to merely match.
- Format is consistently **ranges**, never single fixed prices, and several pages explicitly disclaim variability by brand/material/complexity — same posture the plan already recommends.

---

## 7. Recommended changes to §3

1. **`/couronnes-dentaires-maroc/` → `/couronne-dentaire-maroc/`** (singular). Fixes both the competitor mismatch and the plan's own internal Tier1/Tier2 inconsistency.
2. **`/prix/blanchiment-maroc/` → `/prix/blanchiment-dentaire-maroc/`**. Fixes inconsistency with the Tier 1 slug and matches the dominant competitor pattern.
3. **Drop `/rehabilitation-complete-maroc/` as a standalone Tier 1 pillar.** No competitor targets it independently; fold into an All-on-4/All-on-6 comparison page or a guide, or it will cannibalize those two pillars.
4. **Flag `/implants-dentaires-maroc/` singular-vs-plural as unresolved and worth real budget.** It's the single highest-value term in the plan and the evidence here is a genuine coin-flip — don't lock this slug on structural inference alone.
5. **Reframe Tier 6 messaging from "under-served wedge" to "contested but winnable if the guardrails are followed exactly."** Senegal/Côte d'Ivoire/Cameroun/Gabon have a live, well-built direct competitor (evitalink.com); Mali/Congo remain more open. The §7 guardrails should stay exactly as strict as written — they're what it takes to match the page that's already ranking there, not a hypothetical bar.
6. **Consider whether `/bridge-dentaire-maroc/` needs the full pillar+price split.** No competitor splits this treatment across two pages; most competitors answer "what is it" and "what does it cost" on one page. Not disqualifying, but worth a deliberate call rather than defaulting to the same two-page pattern used for implants.
7. **Treat `/devis-gratuit/` and `/prix/` (the hub) as internal/conversion infrastructure in the roadmap and word-count budget, not as pages expected to independently rank.** Neither appeared as a ranking destination anywhere in this research.

---

## 8. Open questions (cannot resolve without better tooling)

- **True search volume for every term above** — the DataForSEO 401 blocks this entirely. Nothing in this document should be read as a volume signal; it's page-type and structural pattern only.
- **Whether Dentavacation/Bookimed/MedicalTourismCo/Meilleure Clinique/Dental Departures genuinely don't compete in French Morocco-dental SERPs, or whether the US-localized tool is just hiding them.** This materially affects whether §11's directory-listing strategy is pointed at the right platforms. Needs a France-based rank tracker or a manual check from a French IP/VPN.
- **True ranking order** for any term — I can report who's *present*, never who's *#1 vs #9*. A France-localized SERP tool (DataForSEO SERP API once credentials work, or a manual incognito check from a French IP) is needed before treating any "who ranks" list here as competitive priority.
- **How much of the Senegal/Cameroun/Gabon organic traffic Evitalink is actually capturing.** I can confirm the pages exist and look substantive; I cannot confirm they rank well or convert. A backlink/traffic tool (Ahrefs, or DataForSEO domain analytics once authenticated) would settle this.
- **Mali and Congo demand** — genuinely no competitor content found, but with no volume data this could mean real unclaimed demand or simply no demand worth serving. Cannot distinguish without keyword volume for those two markets specifically.
- **Whether forum/UGC content (expat.com, yabiladi.com, forum.sports-sante.com) ranks highly enough in the real SERP to force a different content strategy** (e.g., a genuine reviews/community angle) for some terms — these surfaced even through a US-localized tool, which suggests they may rank higher in the real French SERP than what I could observe here.
