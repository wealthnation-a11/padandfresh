

## Switch to freewill donations — remove fixed prices everywhere

The site currently anchors every CTA, card, and stat around the ₦700 price point and pre-set bundles (Pad a Girl, Fresh Boy, Support Both, Sponsor 10). We'll rework the experience so visitors give whatever amount they choose, with no suggested or displayed prices anywhere on the public site. Donations remain a single "give freely" flow that still lets donors pick which program their gift supports (Pad a Girl, Fresh Boy, or Both) for impact reporting — just without a price tag.

### What changes on the public site

**Home (`/`)**
- Hero subline: replace "₦700. Two ways to change a Nigerian youth's life." with a freewill-focused line ("Give what you can. Change a life today.")
- Replace the two pink/blue hero CTAs ("Pad a Girl — ₦700" / "Fresh Boy — ₦700") with two CTAs that drop the price (just "💜 Pad a Girl" / "💙 Fresh Boy")
- Counters: remove the "Total raised" ₦ counter. Keep Girls supported, Boys supported, Youth supported, Donors this month
- Mission bullets: drop the "(₦700)" suffixes
- "How It Works" cards (Pad a Girl / Fresh Boy / Support Both): remove the big ₦700 / ₦1,400 prices; replace with a short tag like "Give freely" or simply omit the price line
- Final CTA: "Your ₦700 starts now." → "Your gift starts now." Body and button stay focused on giving

**About (`/about`)**
- Program cards: remove "₦700 per girl" / "₦700 per boy" subtitles
- "Why Fresh Boy" copy: remove the two ₦700 references; rephrase to focus on access without a price anchor
- Live impact strip: remove the "Total raised" ₦ stat (replace with something like "Programs running")
- Final CTA button "Donate ₦700 now" → "Donate now"

**Live donation feed (`LiveDonationFeed`)**
- Stop showing the ₦ amount in each row. Each entry becomes "{Name} donated {for a girl / for a boy / for a girl & a boy}" with the timestamp underneath. Donors' gift sizes stay private on the public-facing wall.

**Dashboard (`/dashboard`)**
- Remove "Total raised" big stat; replace with "Programs" or expand other tiles
- Remove the Donation Breakdown card entirely (it shows ₦ totals per program). Replace with a simpler "Youth supported by program" breakdown using counts (girls / boys / both), not naira
- Top Donors table: remove the "Amount" column. Rank donors by youth supported instead of money. Header becomes "Top Supporters"

**Donate flow (`/donate`)**
- Step 1 ("Choose Your Impact") becomes "Choose what you're supporting" with three tiles only: Pad a Girl, Fresh Boy, Support Both. No prices, no "Sponsor 10", no "Custom Amount" tile
- Step 2 ("Donation Type") stays — one-time vs monthly
- A new Step "Your Gift" is added between Type and Info, with a single freewill amount input. Helper text: "Give whatever feels right to you. Minimum ₦100." Min is enforced silently for Paystack viability but no suggested values shown
- Step 4 (Payment) review: keep the total (donors need to see what they're about to be charged), but remove "≈ supports N youth" math everywhere on the public site. Impact line on the review just shows the program they picked
- Bottom-of-page running "Total" indicator: only show after the donor has entered an amount (hidden on Steps 1 and 2)

**Header (`SiteHeader`)** — no copy with prices, nothing to change.

### What changes in the data layer

- **No DB schema changes.** The `donations` table already stores `amount`, `donation_type`, `girls_count`, `boys_count`. We just stop displaying `amount` publicly.
- `girls_count` / `boys_count` for new donations: set to `1` for `pad_girl`, `1` for `fresh_boy`, `1+1` for `both`. We're no longer deriving "units per ₦700" from the amount, so the `impactCounts()` helper used at insert-time gets simplified.
- `donation_type` enum on the form is reduced to `pad_girl | fresh_boy | both`. Existing rows with `custom` / `sponsor_10` remain readable; the dashboard's "Custom / Sponsor" breakdown bar goes away with the breakdown card.
- The receipt PDF already shows the amount to the donor (private); that stays — it's their personal record.

### Files touched

- `src/routes/index.tsx` — hero copy, CTA buttons, counters, mission bullets, How It Works cards, final CTA
- `src/routes/about.tsx` — program card prices, Fresh Boy copy, impact strip, final CTA
- `src/routes/dashboard.tsx` — remove Total Raised stat, replace breakdown card, drop Amount column
- `src/routes/donate.tsx` — restructure steps, drop Sponsor 10 + Custom tiles, new freewill amount step, drop unit math
- `src/components/LiveDonationFeed.tsx` — remove amount display
- `src/lib/format.ts` — simplify `impactCounts()` (no more amount-derived units; just per-type 1/1/both)
- Search schema in `donate.tsx` — narrow `type` enum to the 3 supported values; keep backward compatibility for old links by mapping unknown → `pad_girl`

### What the donor still sees on prices (private only)

- Step 4 review total (so they know what they're paying)
- Paystack checkout (must show amount)
- Their downloaded PDF receipt and emailed receipt (their personal record)

