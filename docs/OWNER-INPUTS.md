# Owner inputs — what's needed to unblock Phases 1 and 3

**Status:** blocking. Phase 0 (infrastructure) is running without these, but content cannot start until they land.

Two things gate everything: **the partner dentist's credentials** and **approved price ranges**. Neither can be produced by an agent or worked around in code. Both come from the clinic partner or from you.

---

## A. Dentist & clinic credentials (gates Phase 1)

Dental care is **YMYL** — "Your Money or Your Life" — the category where Google applies its harshest quality bar. Pages that give health guidance with no identifiable qualified person behind them are capped on how well they can rank, regardless of how good the writing is. Every French competitor that ranks names their surgeon with university and years of practice.

This is also the single biggest conversion lever. "Who is actually going to operate on me, and are they qualified?" is the first question every dental tourism patient asks.

### Required

| Item | Used for |
|---|---|
| Dentist's full name | `/cabinet-partenaire/`, `Person` schema, `reviewedBy` on every medical guide |
| Qualifications + awarding university | E-E-A-T; competitors all show this |
| Year qualified / years practising | Same |
| Professional registration or licence number | `identifier` in schema — strongest verifiable trust signal available |
| Areas of focus (implantology, cosmetic, etc.) | Matching dentists to treatment pages |
| Languages spoken | Patient-facing, and a genuine differentiator |
| Clinic's registered legal name | `Dentist` schema entity (separate from the agency) |
| Clinic's full street address | `PostalAddress` schema, NAP consistency |
| Clinic's phone number | Same — must match their Google Business Profile **character for character** |
| Clinic's own website, if any | Cross-linking, `sameAs` |

### Photos (real ones — no stock)

- Professional photo of the dentist
- The actual treatment rooms and equipment
- The reception/waiting area
- Exterior with signage

Stock photography is transparent to patients and actively undermines the trust these pages exist to build.

### Written permissions

- To name the dentist and clinic publicly on the site
- To publish the photos
- To describe the partnership between your agency and their practice

---

## B. Price ranges (gates Phase 3)

The highest-intent search traffic in this niche is price queries. The current site says it doesn't publish prices, which forfeits that entire cluster.

**This does not mean publishing fixed quotes.** Your closest competitor, endurance-implant.com, also refuses fixed quotes — and still runs a pricing page with indicative ranges. Ranges capture the search; the actual quote still happens over email after they send X-rays.

Validation found that agency-model competitors quote French patients in **EUR** as `à partir de X€` — not MAD. Use that format.

### Required — a "from €X" figure per treatment

- Single dental implant (including abutment and crown)
- Implant alone, if you quote it separately
- Veneer, per tooth
- Crown, per tooth — and which materials
- Bridge
- All-on-4, per arch
- All-on-6, per arch
- Teeth whitening
- Bone graft / sinus lift, if offered

### Also needed

- **What's included vs excluded** in each figure — the most common source of patient complaint in dental tourism
- Typical number of trips and nights per treatment
- Payment methods accepted, and any constraints on transfers from West/Central Africa specifically
- Deposit policy
- **Guarantee terms** — what's covered, for how long, and what happens if something fails after the patient is home. This feeds `/garanties/`, which the plan identifies as both your highest-converting page and your best link magnet.

---

## C. Testimonials (gates Phase 4 — country pages)

Country pages may only ship if they include a genuine testimonial from a patient of that nationality (see §7 of the plan). No testimonial, no page.

For each: first name, city/country, treatment received, approximate date, and **written consent to publish**. Photos and before/after images need separate explicit consent.

> **Never fabricate a testimonial, review, or before/after image.** Beyond being a YMYL quality violation, it is illegal in France, Belgium and most other target markets. Six real country pages beat twelve invented ones, and carry none of the risk.

---

## D. Ready-to-send request

*Written for: your clinic partner. Forward as-is or adapt.*

> Bonjour,
>
> Nous préparons le nouveau site qui présentera nos séjours de soins dentaires au Maroc aux patients francophones. Pour que le site soit bien référencé sur Google et inspire confiance aux patients, Google exige que les informations médicales soient clairement attribuées à un praticien identifié et qualifié. C'est aujourd'hui le point le plus important pour notre visibilité.
>
> Pourriez-vous nous transmettre :
>
> **1. Informations sur le praticien**
> - Nom complet
> - Diplômes et université d'obtention
> - Année d'obtention du diplôme / nombre d'années d'exercice
> - Numéro d'inscription à l'Ordre
> - Spécialités (implantologie, esthétique…)
> - Langues parlées
>
> **2. Informations sur le cabinet**
> - Dénomination légale exacte
> - Adresse complète
> - Numéro de téléphone (exactement tel qu'il apparaît sur votre fiche Google)
> - Site internet, le cas échéant
>
> **3. Photos réelles** (pas de banque d'images) : le praticien, les salles de soins, les équipements, l'accueil, la façade.
>
> **4. Tarifs indicatifs** — un tarif « à partir de » en euros pour : implant unitaire (avec pilier et couronne), facette, couronne (en précisant les matériaux), bridge, All-on-4 et All-on-6 par arcade, blanchiment, greffe osseuse. En précisant pour chaque tarif ce qui est inclus et ce qui ne l'est pas, ainsi que le nombre de séjours et de nuits habituellement nécessaires.
>
> **5. Conditions de garantie** — durée, ce qui est couvert, et la procédure si un problème survient après le retour du patient dans son pays. C'est la question que posent le plus souvent les patients.
>
> **6. Autorisations écrites** nous permettant de citer votre nom et celui du cabinet, de publier les photos, et de décrire notre partenariat sur le site.
>
> Nous restons à votre disposition pour en discuter.
>
> Bien cordialement,

---

## Priority order

If the clinic can only supply things gradually, this is the order that unblocks the most work soonest:

1. **Dentist name + qualifications + licence number** — unblocks all of Phase 1
2. **Guarantee terms** — unblocks `/garanties/`, the highest-value single page in the plan
3. **Price ranges** — unblocks the whole of Phase 3
4. **Photos** — needed before any page ships publicly
5. **Testimonials** — only needed at Phase 4
