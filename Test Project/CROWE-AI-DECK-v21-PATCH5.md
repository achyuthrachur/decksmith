# Crowe AI Strategy Deck — v21 Patch 5
# Final content and layout pass

## Overview

Edit `Crowe-AI-Strategy-Presentation (Revised-v21).html` in-place.
Work through each fix in order. Do not touch slides not listed here.
The SLIDES array and new slide must be handled carefully — read Fix 7 fully before touching the JS.

---

## Fix 1 — s3 (Slide 2): Sell AI card — update bullets

**Find the Sell AI slist inside s3:**
```html
<ul class="slist" style="font-size:clamp(14px,1.3vw,16px);">
          <li>Forward-deployed AI resources in client engagements</li>
          <li>Assessment &rarr; Implementation &rarr; Managed Service</li>
          <li>Industry-specific use cases that convert to revenue</li>
        </ul>
```

**Replace with:**
```html
<ul class="slist" style="font-size:clamp(14px,1.3vw,16px);">
          <li>Forward-deployed AI resources in client engagements</li>
          <li>Industry-specific use cases that convert to revenue</li>
          <li>AI Governance</li>
          <li>AI Strategy</li>
          <li>AI Data Transformation</li>
        </ul>
```

Changes: remove "Assessment → Implementation → Managed Service", add three new bullets.
Do NOT touch the Improve or Create Value card slists on s3.

---

## Fix 2 — s4 (Slide 3): Pricing panel — uniform font sizes

**Problem:** Dollar amounts are inconsistent — AI Strategy uses `clamp(18px,1.8vw,22px)` while
all other prices use `font-size:16px`. Section header names are all 14px — fine, keep those.
Standardise every dollar amount to `clamp(18px,1.8vw,22px)` with `font-weight:700`.

**Find all 6 price value spans and update:**

Find (AI Governance prices — 3 instances of `font-size:16px;font-weight:600;color:var(--cyan)`):
```
font-size:16px;font-weight:600;color:var(--cyan);">$25K &ndash; $75K
```
Replace with:
```
font-size:clamp(18px,1.8vw,22px);font-weight:700;color:var(--cyan);">$25K &ndash; $75K
```

```
font-size:16px;font-weight:600;color:var(--cyan);">$15K &ndash; $50K
```
Replace with:
```
font-size:clamp(18px,1.8vw,22px);font-weight:700;color:var(--cyan);">$15K &ndash; $50K
```

```
font-size:16px;font-weight:600;color:var(--cyan);">$20K &ndash; $75K
```
Replace with:
```
font-size:clamp(18px,1.8vw,22px);font-weight:700;color:var(--cyan);">$20K &ndash; $75K
```

Find (AI Enablement prices — 3 instances of `font-size:16px;font-weight:600;color:var(--teal)`):
```
font-size:16px;font-weight:600;color:var(--teal);">$5K &ndash; $15K
```
Replace with:
```
font-size:clamp(18px,1.8vw,22px);font-weight:700;color:var(--teal);">$5K &ndash; $15K
```

```
font-size:16px;font-weight:600;color:var(--teal);">$15K &ndash; $50K
```
Replace with:
```
font-size:clamp(18px,1.8vw,22px);font-weight:700;color:var(--teal);">$15K &ndash; $50K
```

```
font-size:16px;font-weight:600;color:var(--teal);">$25K &ndash; $100K
```
Replace with:
```
font-size:clamp(18px,1.8vw,22px);font-weight:700;color:var(--teal);">$25K &ndash; $100K
```

Find (TBD — currently `font-size:16px`):
```
font-size:16px;font-style:italic;color:rgba(255,255,255,.52);">TBD
```
Replace with:
```
font-size:clamp(18px,1.8vw,22px);font-style:italic;color:rgba(255,255,255,.52);">TBD
```

Result: all 7 price values (including AI Strategy's existing `clamp(18px,1.8vw,22px)`) are now identical in size.

---

## Fix 3 — s6 (Slide 4): Replace "SI" with "System Implementation"

**Find inside s6:**
```
Decompose core delivery: IA, SI, Review Services, Data Governance
```
**Replace with:**
```
Decompose core delivery: IA, System Implementation, Review Services, Data Governance
```

---

## Fix 4 — s9 (Slide 6): Full content replacement — Internal Audit use case

Replace the entire inner content of slide s9 (everything between the opening
`<div class="slide ... id="s9">` tag and its closing `</div>`) with the following.
Keep the slide's opening div tag exactly as-is (preserve all classes, id, and the
canvas/bg/bg-ov elements that are already there). Only replace the `.f-content` div
and everything inside it.

**Find inside s9 — the entire f-content block:**
```html
<div class="f-content">
    <div class="ani"><div class="eyebrow">All Three Pillars in Action</div></div>
    <div class="ani"><h2>What good looks like</h2></div>
```
(find the opening of f-content and replace everything up to and including the closing `</div>` that closes f-content)

**Replace the entire f-content with:**
```html
  <div class="f-content">
    <div class="ani"><div class="eyebrow">Case Study</div></div>
    <div class="ani"><h2>What Good Looks Like</h2></div>
    <div class="ani mt8">
      <p style="font-size:clamp(14px,1.3vw,16px);color:rgba(255,255,255,.82);">
        Organizations are moving toward continuous monitoring, continuous auditing, and full population testing.
      </p>
    </div>
    <div class="ani mt16" style="display:flex;flex-direction:column;gap:8px;flex:1;">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px;flex:1;">

        <div class="card" style="padding:14px 12px;display:flex;flex-direction:column;gap:6px;border-color:rgba(245,168,0,.18);">
          <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:var(--amber);">STAGE 1</div>
          <p style="font-size:clamp(12px,1.05vw,14px);color:rgba(255,255,255,.82);line-height:1.45;">
            Crowe conducts an AI workshop to educate and enable clients who have recently adopted a new large language model
          </p>
        </div>

        <div class="card" style="padding:14px 12px;display:flex;flex-direction:column;gap:6px;border-color:rgba(245,168,0,.18);">
          <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:var(--amber);">STAGE 2</div>
          <p style="font-size:clamp(12px,1.05vw,14px);color:rgba(255,255,255,.82);line-height:1.45;">
            Crowe conducts an AI value lab to decompose internal audit processes and identify pain points and opportunities
          </p>
        </div>

        <div class="card" style="padding:14px 12px;display:flex;flex-direction:column;gap:6px;border-color:rgba(245,168,0,.18);">
          <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:var(--amber);">STAGE 3</div>
          <p style="font-size:clamp(12px,1.05vw,14px);color:rgba(255,255,255,.82);line-height:1.45;">
            Crowe provides a detailed AI and advanced technology roadmap outlining what can be done now, next, and later
          </p>
        </div>

        <div class="card" style="padding:14px 12px;display:flex;flex-direction:column;gap:6px;border-color:rgba(5,171,140,.22);background:rgba(5,171,140,.05);">
          <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:var(--teal);">STAGE 4</div>
          <p style="font-size:clamp(12px,1.05vw,14px);color:rgba(255,255,255,.82);line-height:1.45;">
            Clients select priority opportunities and engage Crowe to help define a path toward continuous monitoring and auditing
          </p>
        </div>

        <div class="card" style="padding:14px 12px;display:flex;flex-direction:column;gap:6px;border-color:rgba(5,171,140,.22);background:rgba(5,171,140,.05);">
          <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:var(--teal);">STAGE 5</div>
          <p style="font-size:clamp(12px,1.05vw,14px);color:rgba(255,255,255,.82);line-height:1.45;">
            Crowe deploys engineering resources to build advanced tooling that drives efficiency in the near term
          </p>
        </div>

        <div class="card" style="padding:14px 12px;display:flex;flex-direction:column;gap:6px;border-color:rgba(5,171,140,.22);background:rgba(5,171,140,.05);">
          <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:var(--teal);">STAGE 6</div>
          <p style="font-size:clamp(12px,1.05vw,14px);color:rgba(255,255,255,.82);line-height:1.45;">
            Crowe and client co-develop a roadmap to achieve continuous monitoring and continuous auditing
          </p>
        </div>

        <div class="card" style="padding:14px 12px;display:flex;flex-direction:column;gap:6px;border-color:rgba(255,255,255,.08);opacity:.5;">
          <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,.45);">STAGE 7</div>
          <p style="font-size:clamp(12px,1.05vw,14px);color:rgba(255,255,255,.5);line-height:1.45;font-style:italic;">
            To be determined
          </p>
        </div>

      </div>
    </div>
  </div>
```

Note on styling intent: Stages 1–3 use the neutral `.card` style with a subtle amber border
(Crowe-led education/discovery). Stages 4–6 use teal accent (client engagement + delivery).
Stage 7 is dimmed/italic (TBD).

---

## Fix 5 — New slide: "The Playbook" divider (between current slides 9 and 10)

**Step 5a — Add the new slide HTML.**
Find the closing `</div>` of slide s12 (the 18-Month Goals slide). It is immediately followed
by the opening of slide s14. Insert the following new slide between them:

```html
<div class="slide l-full g-grid" id="s-divider">
  <div class="logo-wrap" id="l-divider"></div>
  <div class="stag">Playbook</div>
  <div class="f-content" style="display:flex;align-items:center;justify-content:center;flex:1;">
    <div style="text-align:center;">
      <div class="ani">
        <div style="font-size:10px;font-weight:700;letter-spacing:.28em;color:var(--amber);text-transform:uppercase;margin-bottom:20px;">Section</div>
        <h1 style="font-family:'DM Serif Display',serif;font-size:clamp(52px,7vw,88px);font-weight:400;line-height:1.05;color:var(--white);">The <em style="color:var(--amber);font-style:italic;">Playbook</em></h1>
        <p style="font-size:clamp(15px,1.4vw,18px);color:rgba(255,255,255,.5);margin-top:16px;font-style:italic;">How we execute the strategy</p>
      </div>
    </div>
  </div>
</div>
```

**Step 5b — Update the SLIDES array in the JS block.**
Find:
```javascript
const SLIDES = ['s1','s3','s4','s6','s8','s9','s10','s11','s12','s14','s15','s16','s17','s18','s13'];
```
Replace with:
```javascript
const SLIDES = ['s1','s3','s4','s6','s8','s9','s10','s11','s12','s-divider','s14','s15','s16','s17','s18','s13'];
```

This adds `s-divider` between `s12` and `s14`. TOTAL will auto-update to 16 since it uses
`SLIDES.length`.

---

## Fix 6 — s14 (Slide 10): Reorder focus areas + add click navigation

**Step 6a — Reorder the three focus area cards.**

Current order inside the left column of s14:
1. card-a (amber) — Incrementally Improve Existing Offerings
2. card-t (teal) — Create New Client Value Through AI-Enabled Offerings
3. card-c (cyan) — Sell AI Strategy, Transformation & Implementation Services

New order:
1. card-c (cyan) — Sell AI Strategy, Transformation & Implementation Services
2. card-t (teal) — Create New Client Value Through AI-Enabled Offerings
3. card-a (amber) — Incrementally Improve Existing Offerings

**Rewrite the left column div** (the `<div style="display:flex;flex-direction:column;gap:12px;flex:1;">`)
with the cards in the new order. Copy the card-c block first, then card-t, then card-a.
Update the ghost numbers to reflect the new order (1 on cyan, 2 on teal, 3 on amber).

**Step 6b — Add click navigation to each card.**

The navigation function is `goTo(n)` where n is the 0-based index in the SLIDES array.
After adding s-divider in Fix 5, the updated indices are:
- s15 (Incremental Improvement) = index 11
- s16 (Create New Client Value) = index 12
- s17 (Build Scale Monetize) = index 13

Add `onclick` and `cursor:pointer` to each of the three focus area cards:
- Sell AI card (card-c, now card 1) → `onclick="goTo(13)"` (navigates to s17)
- Create Value card (card-t, now card 2) → `onclick="goTo(12)"` (navigates to s16)
- Incrementally Improve card (card-a, now card 3) → `onclick="goTo(11)"` (navigates to s15)

Also add a visual affordance on each card — append this small "→" indicator div inside
each clickable card, just before its closing `</div>`:
```html
<div style="margin-top:auto;padding-top:8px;font-size:11px;font-weight:600;color:rgba(255,255,255,.3);letter-spacing:.1em;">VIEW DETAILS →</div>
```

And add hover style to the card itself: add `transition:border-color .2s,background .2s;`
and `onmouseover="this.style.borderColor='rgba(255,255,255,.25)'"` and
`onmouseout="this.style.borderColor=''"` to each clickable card div.

---

## Fix 7 — s15 (Slide 11): Layout — Box 1+2 short top row, Box 3 full width, Box 4 full width

**Change the grid layout** of the 4-step container from a 2×2 equal grid to a 3-row layout
where steps 3 and 4 each span the full width.

**Find the 4-step grid container opening div inside s15:**
```html
<div class="ani" style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:8px;flex:1;min-height:0;">
```
**Replace with:**
```html
<div class="ani" style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto auto;gap:8px;flex:1;min-height:0;">
```

Then add `grid-column: 1 / -1;` (span full width) to the Step 3 and Step 4 card divs.

**Find the Step 3 card opening tag:**
```html
<div class="card" style="padding:10px 12px;overflow:hidden;display:flex;flex-direction:column;">
        <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:2px;"><span class="pnum" style="color:var(--amber);opacity:.22;font-size:22px;margin:0;">3</span>
```
**Replace** the opening style of that card with:
```html
<div class="card" style="padding:10px 12px;overflow:hidden;display:flex;flex-direction:column;grid-column:1 / -1;">
```

**Find the Step 4 card opening tag** (same pattern, number 4):
```html
<div class="card" style="padding:10px 12px;overflow:hidden;display:flex;flex-direction:column;">
        <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:2px;"><span class="pnum" style="color:var(--amber);opacity:.22;font-size:22px;margin:0;">4</span>
```
**Replace** the opening style of that card with:
```html
<div class="card" style="padding:10px 12px;overflow:hidden;display:flex;flex-direction:column;grid-column:1 / -1;">
```

With this change: Steps 1+2 share the first row at natural/auto height, Step 3 spans
the full width in row 2, Step 4 spans the full width in row 3.

---

## Fix 8 — s16 (Slide 12): Box 2 Gap Analysis — bullet formatting + font size

**Problem:** Box 2 (Gap Analysis) uses custom flex rows for the before→after content
while all other boxes use `.slist`. Convert to `.slist` format so it looks consistent.
Each row becomes one bullet: "Annual audit → Continuous assurance" as a single `<li>`.

**Find the Gap Analysis content block inside s16** — the four flex rows:
```html
<div style="display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;align-items:center;gap:8px;"><span style="color:rgba(255,255,255,.85);font-size:14px;">Annual audit</span><span style="color:var(--amber);font-weight:700;">&rarr;</span><span style="color:rgba(255,255,255,.92);font-size:14px;font-weight:600;">Continuous assurance</span></div>
          <div style="display:flex;align-items:center;gap:8px;"><span style="color:rgba(255,255,255,.85);font-size:14px;">Sample testing</span><span style="color:var(--amber);font-weight:700;">&rarr;</span><span style="color:rgba(255,255,255,.92);font-size:14px;font-weight:600;">Full-population monitoring</span></div>
          <div style="display:flex;align-items:center;gap:8px;"><span style="color:rgba(255,255,255,.85);font-size:14px;">Static reporting</span><span style="color:var(--amber);font-weight:700;">&rarr;</span><span style="color:rgba(255,255,255,.92);font-size:14px;font-weight:600;">Real-time insights</span></div>
          <div style="display:flex;align-items:center;gap:8px;"><span style="color:rgba(255,255,255,.85);font-size:14px;">Reactive compliance</span><span style="color:var(--amber);font-weight:700;">&rarr;</span><span style="color:rgba(255,255,255,.92);font-size:14px;font-weight:600;">Predictive risk management</span></div>
        </div>
```

**Replace with:**
```html
<ul class="slist">
          <li><span style="color:rgba(255,255,255,.72);">Annual audit</span> <span style="color:var(--amber);font-weight:700;">&rarr;</span> <strong>Continuous assurance</strong></li>
          <li><span style="color:rgba(255,255,255,.72);">Sample testing</span> <span style="color:var(--amber);font-weight:700;">&rarr;</span> <strong>Full-population monitoring</strong></li>
          <li><span style="color:rgba(255,255,255,.72);">Static reporting</span> <span style="color:var(--amber);font-weight:700;">&rarr;</span> <strong>Real-time insights</strong></li>
          <li><span style="color:rgba(255,255,255,.72);">Reactive compliance</span> <span style="color:var(--amber);font-weight:700;">&rarr;</span> <strong>Predictive risk management</strong></li>
        </ul>
```

Also remove the sub-label div above the rows (the "CURRENT OFFERINGS → FUTURE CLIENT NEEDS"
label) since the `.slist` format makes it self-evident — or keep it if it aids clarity.
Your call — instruction here is to remove it to reduce visual noise and match other boxes
that don't have sub-labels.

---

## Fix 9 — s17 (Slide 13): Expand box bullet 1 + insert new bullet + center banner

**Step 9a — Change bullet 1 in the Expand slist.**
Find inside s17's Expand card:
```html
<li>AI governance frameworks</li>
```
Replace with:
```html
<li>AI Governance</li>
```

**Step 9b — Insert new bullet "AI Solution Development" between bullet 3 and bullet 4.**
Find inside s17's Expand card:
```html
<li>Data architecture transformation</li><li>AI implementation support</li>
```
Replace with:
```html
<li>Data architecture transformation</li><li>AI Solution Development</li><li>AI implementation support</li>
```

**Step 9c — Center-align the bottom banner content.**
The banner currently left-aligns all content. Find the overarching capability banner card:
```html
<div class="card" style="padding:16px 20px;border-left:3px solid var(--amber);">
        <div style="font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:4px;">OVERARCHING CAPABILITY</div>
        <h3>Enterprise AI Strategy Advisory</h3>
        <p class="dim" style="font-size:clamp(12px,1.1vw,14px);">Define enterprise AI strategy &middot; Align AI to business value &middot; Prioritize investments &middot; Establish governance</p>
```
Replace with:
```html
<div class="card" style="padding:16px 20px;border-left:3px solid var(--amber);text-align:center;">
        <div style="font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:4px;">OVERARCHING CAPABILITY</div>
        <h3>Enterprise AI Strategy Advisory</h3>
        <p class="dim" style="font-size:clamp(12px,1.1vw,14px);">Define enterprise AI strategy &middot; Align AI to business value &middot; Prioritize investments &middot; Establish governance</p>
```
(Only change: add `text-align:center;` to the card's style. The `border-left` stays.)

---

## Fix 10 — s18 (Slide 14): Remove numbering from Crowe AI Value Narrative

**Find inside s18:**
```html
<li><strong>1.</strong> How AI is transforming the client&rsquo;s world</li>
            <li><strong>2.</strong> How Crowe offerings evolve in response</li>
            <li><strong>3.</strong> Why Crowe is differentiated in delivering this value</li>
```
**Replace with:**
```html
<li>How AI is transforming the client&rsquo;s world</li>
            <li>How Crowe offerings evolve in response</li>
            <li>Why Crowe is differentiated in delivering this value</li>
```

---

## Verification Checklist

- [ ] s3: Sell AI card has 5 bullets — "Assessment → Implementation → Managed Service" is gone,
      AI Governance / AI Strategy / AI Data Transformation are added
- [ ] s4: All 7 price values (dollar amounts) render at the same size as $10K–$50K
- [ ] s6: First bullet reads "Decompose core delivery: IA, System Implementation, Review Services, Data Governance"
- [ ] s9: Slide shows 7 stage cards for the Internal Audit use case — no BSA/AML content remains
- [ ] New s-divider slide: appears between 18-Month Goals and AI Strategy Execution Framework,
      shows "The Playbook" centered in large serif type
- [ ] SLIDES array contains 16 entries with s-divider in the correct position
- [ ] s14: Order is now 1=Sell AI (cyan), 2=Create Value (teal), 3=Improve (amber);
      each card is clickable and navigates to its sub-slide; "VIEW DETAILS →" visible on each
- [ ] s15: Steps 1+2 are in a short top row, Step 3 spans full width below, Step 4 spans full width below that
- [ ] s16: Gap Analysis box uses .slist bullets with before → after format, matching other boxes visually
- [ ] s17: Expand bullet 1 reads "AI Governance"; "AI Solution Development" appears between
      "Data architecture transformation" and "AI implementation support";
      Enterprise AI Strategy Advisory banner is center-aligned
- [ ] s18: Value Narrative bullets have no "1.", "2.", "3." prefixes
- [ ] Open in browser and navigate through all 16 slides — no JS errors, progress bar and counter correct
