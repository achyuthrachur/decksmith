# Crowe AI Strategy Deck — v21 Patch 2

## Overview

These are targeted fixes based on visual QC of screenshots. Edit `Crowe-AI-Strategy-Presentation (Revised-v21).html` in-place.
Read all fixes before starting. Work slide by slide in order.

---

## Fix 1 — Slide s3: Three Pillars — overlapping elements + visibility

**Problems:**
- Ghost `.pnum` numbers (01/02/03) are using the global `.pnum` class at 50px — too large inside the cards, pushing content down
- Description text `clamp(12px,1.1vw,14px)` is too small
- Cards should stretch to fill the available vertical space, not cluster at top

**Changes:**

1a. Inside slide s3, find all three `.pnum` divs and add an explicit font-size override to cap them at 38px.
Find (3 occurrences, each with different color):
```
<div class="pnum" style="color:var(--amber);opacity:.18;">01</div>
```
Replace with:
```
<div class="pnum" style="color:var(--amber);opacity:.18;font-size:38px;">01</div>
```

Find:
```
<div class="pnum" style="color:var(--teal);">02</div>
```
Replace with:
```
<div class="pnum" style="color:var(--teal);font-size:38px;">02</div>
```

Find:
```
<div class="pnum" style="color:var(--cyan);">03</div>
```
Replace with:
```
<div class="pnum" style="color:var(--cyan);font-size:38px;">03</div>
```

1b. Make the description text larger and brighter inside s3.
Find (3 occurrences inside s3 — the italic card descriptions):
```
<p class="italic" style="font-size:clamp(12px,1.1vw,14px);">Bring AI capability to market.
```
Replace with:
```
<p class="italic" style="font-size:clamp(14px,1.3vw,16px);color:rgba(255,255,255,.72);">Bring AI capability to market.
```
Apply same font-size change to the other two card descriptions (Improve and Create Value) in s3.

1c. Make the three-column card grid fill the available height.
Find inside s3:
```
style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;flex:1;align-content:start;"
```
Replace with:
```
style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:1fr;gap:16px;flex:1;"
```

1d. Make list items in s3 cards larger.
The `.slist li` global style should be fine but the cards may need explicit size. Inside s3 only, add `style="font-size:clamp(14px,1.3vw,16px);"` to each `<ul class="slist">` inside the three pillar cards.

---

## Fix 2 — Slide s4: Sell AI — wasted space, pricing panel size, grey text

**Problems:**
- Pricing panel is only 280px wide — needs to be wider
- Large empty area below the "How we do it" section
- Card category labels (AI STRATEGY, AI GOVERNANCE, etc.) are `font-size:9px` — too small
- "AI DATA TRANSFORMATION" label uses `var(--mid)` (grey) — should be white/dimmed white
- Overall layout doesn't use full viewport height

**Changes:**

2a. Widen the pricing panel and let the layout fill the height.
Find inside s4:
```
style="display:grid;grid-template-columns:1fr 280px;gap:0;flex:1;"
```
Replace with:
```
style="display:grid;grid-template-columns:1fr 320px;gap:0;flex:1;min-height:0;"
```

2b. Fix the four card category label font sizes (9px → 12px).
Find inside s4 (4 occurrences — the all-caps service card headers):
```
font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:8px;">AI STRATEGY
```
Replace with:
```
font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--amber);margin-bottom:8px;">AI STRATEGY
```

```
font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--cyan);margin-bottom:8px;">AI GOVERNANCE
```
Replace with:
```
font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--cyan);margin-bottom:8px;">AI GOVERNANCE
```

```
font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--teal);margin-bottom:8px;">AI ENABLEMENT
```
Replace with:
```
font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--teal);margin-bottom:8px;">AI ENABLEMENT
```

```
font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--mid);margin-bottom:8px;">AI DATA TRANSFORMATION
```
Replace with:
```
font-size:12px;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,.45);margin-bottom:8px;">AI DATA TRANSFORMATION
```

2c. Make the four service cards fill available height instead of clustering at top.
Find inside s4:
```
style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px;"
```
Replace with:
```
style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px;flex:1;align-items:stretch;"
```

2d. The "HOW WE DO IT" section label inside s4 is also 9px. Fix it.
Find inside s4:
```
font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:8px;">HOW WE DO IT
```
Replace with:
```
font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--amber);margin-bottom:8px;">HOW WE DO IT
```

2e. Make the pricing panel fill full height and be visually heavier.
Find inside s4 the pricing panel wrapper:
```
style="background:rgba(245,168,0,.04);border-left:1px solid rgba(245,168,0,.13);padding:16px 20px;border-radius:0 10px 10px 0;"
```
Replace with:
```
style="background:rgba(245,168,0,.05);border-left:1px solid rgba(245,168,0,.2);padding:20px 22px;border-radius:0 10px 10px 0;display:flex;flex-direction:column;gap:10px;"
```

2f. Fix the pricing panel PRICING label (also 9px).
Find inside s4's pricing panel:
```
font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:14px;">PRICING
```
Replace with:
```
font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--amber);margin-bottom:14px;">PRICING
```

2g. The sub-item pricing labels (Program Build, Assessment, Execute, Workshops, etc.) inside the pricing panel use small grey text. Make them white.
Find all occurrences of this pattern inside s4's pricing panel:
```
style="font-size:11px;color:rgba(255,255,255,.5);
```
Replace with:
```
style="font-size:12px;color:rgba(255,255,255,.7);
```

---

## Fix 3 — Slide s14: AI Strategy Execution Framework — remove Ph. badges, improve density

**Problems:**
- Ph.1, Ph.2, Ph.3, All badges still present — remove them entirely
- Left column cards are sparsely filled with lots of empty space
- Text can be larger throughout

**Changes:**

3a. Remove all four phase badge `<span>` elements from inside the slist on s14.
The four list items currently look like:
```
<li><span style="display:inline-block;background:rgba(245,168,0,.15);color:var(--amber);font-size:8px;font-weight:700;padding:2px 6px;border-radius:3px;margin-right:4px;">Ph.1</span> Identify <strong>5&ndash;10</strong> AI opportunities</li>
```
Replace that entire `<li>` with:
```
<li>Identify <strong>5&ndash;10</strong> AI opportunities</li>
```

Do the same for all four items — strip the badge span, keep the rest of the text:
```
<li>Launch <strong>2+</strong> AI pilots</li>
<li>Advance <strong>1</strong> offering transformation initiative</li>
<li>Generate <strong>3+</strong> AI client engagements or conversations</li>
```

3b. Increase text sizes on the three focus area cards.
Find inside s14 (the pnum style on all three cards — 36px ghost numbers):
```
style="color:var(--amber);opacity:.25;font-size:36px;"
```
Replace with:
```
style="color:var(--amber);opacity:.22;font-size:42px;"
```
Apply the same change to the teal and cyan variants too:
```
style="color:var(--teal);opacity:.25;font-size:36px;"
```
→
```
style="color:var(--teal);opacity:.22;font-size:42px;"
```
```
style="color:var(--cyan);opacity:.25;font-size:36px;"
```
→
```
style="color:var(--cyan);opacity:.22;font-size:42px;"
```

3c. Make the italic descriptions on the three cards larger and brighter.
Find inside s14 (3 occurrences):
```
style="font-size:clamp(12px,1.1vw,14px);"
```
Replace with:
```
style="font-size:clamp(14px,1.3vw,16px);color:rgba(255,255,255,.75);"
```

3d. Make the three cards stretch to fill the full left column height.
Find inside s14:
```
<div style="display:flex;flex-direction:column;gap:12px;">
```
Replace with:
```
<div style="display:flex;flex-direction:column;gap:12px;flex:1;">
```
Also update each card-a/t/c inside that column to stretch:
Add `flex:1;` to each of the three card divs' style. For example:
```
<div class="card card-a fc g8" style="padding:16px 20px;">
```
→
```
<div class="card card-a fc g8" style="padding:16px 20px;flex:1;">
```
Do this for card-t and card-c as well.

3e. Fix the "MINIMUM EXECUTION STANDARD" label (currently 9px, will be fixed by Patch 1 Fix 3 — if that patch wasn't applied yet, apply it here):
```
font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:8px
```
→
```
font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--amber);margin-bottom:10px
```

3f. Make the right panel card fill the full column height (not `align-self:start`).
Find inside s14:
```
style="padding:18px 20px;align-self:start;"
```
Replace with:
```
style="padding:20px 22px;align-self:stretch;"
```

3g. Make the "Each business line, per quarter:" subtitle larger.
Find inside s14:
```
style="font-size:clamp(11px,1vw,13px);margin-bottom:10px;"
```
Replace with:
```
style="font-size:clamp(13px,1.2vw,15px);margin-bottom:12px;color:rgba(255,255,255,.65);"
```

---

## Fix 4 — Slide s15: Incremental Improvement — remove Phase 1 eyebrow, improve layout density

**Problems:**
- Eyebrow still reads "Playbook · Phase 1" — remove "· Phase 1"
- The 4-step 2×2 grid causes steps 3 and 4 to be partially clipped at the bottom
- "EVALUATE EACH COMPONENT:" sub-label uses var(--mid) grey

**Changes:**

4a. Remove "Phase 1" from eyebrow (if not already done by Patch 1 Fix 1):
Find inside s15:
```
>Playbook &middot; Phase 1<
```
Replace with:
```
>Playbook<
```

4b. Fix the "EVALUATE EACH COMPONENT:" sub-label visibility:
Find inside s15:
```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase;margin-bottom:6px;font-style:italic;">Evaluate each component:
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.55);text-transform:uppercase;margin-bottom:6px;">Evaluate each component:
```

4c. Tighten the overall layout to prevent bottom clipping. Reduce top margin on the grid:
Find inside s15:
```
class="ani mt12" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1;align-content:start;"
```
Replace with:
```
class="ani mt8" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1;align-content:stretch;"
```

4d. Reduce card padding on s15 so all 4 steps fit within viewport:
Find inside s15 (all four step cards have `padding:16px 18px`):
Replace all occurrences of `style="padding:16px 18px;"` inside s15 with `style="padding:12px 14px;"`

4e. Reduce the pnum ghost number sizes inside s15 to free up vertical space:
Find inside s15 (4 occurrences):
```
style="color:var(--amber);opacity:.25;font-size:32px;"
```
Replace with:
```
style="color:var(--amber);opacity:.22;font-size:26px;"
```

---

## Fix 5 — Slide s16: Create New Client Value — remove Phase 2 eyebrow, improve layout

**Problems:**
- Eyebrow reads "Playbook · Phase 2" — remove
- Content overflows at bottom — layout needs tightening
- Sub-labels ("ASSESS:", "CURRENT OFFERINGS →") use var(--mid) grey

**Changes:**

5a. Remove "Phase 2" from eyebrow:
Find inside s16:
```
>Playbook &middot; Phase 2<
```
Replace with:
```
>Playbook<
```

5b. Fix all grey sub-labels inside s16. There are 3 occurrences of the var(--mid) pattern:
Find (all 3 in s16):
```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase;margin-bottom:6px;font-style:italic;">Assess:
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.55);text-transform:uppercase;margin-bottom:6px;">Assess:
```

```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase;margin-bottom:8px;font-style:italic;">Current offerings &rarr; Future client needs
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.55);text-transform:uppercase;margin-bottom:8px;">Current offerings &rarr; Future client needs
```

```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase;margin-bottom:6px;font-style:italic;">Each business line must produce:
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.55);text-transform:uppercase;margin-bottom:6px;">Each business line must produce:
```

5c. Tighten layout to prevent bottom overflow:
Find inside s16:
```
class="ani mt12" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1;align-content:start;"
```
Replace with:
```
class="ani mt8" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1;align-content:stretch;"
```

5d. Reduce card padding on s16:
Replace all `style="padding:16px 18px;"` inside s16 with `style="padding:12px 14px;"`

5e. Reduce pnum sizes in s16:
Find (4 occurrences inside s16):
```
style="color:var(--amber);opacity:.25;font-size:32px;"
```
Replace with:
```
style="color:var(--amber);opacity:.22;font-size:26px;"
```

5f. Make the "before" text in gap analysis rows brighter (currently at .4 opacity — too dim):
Find inside s16 (4 rows):
```
style="color:rgba(255,255,255,.4);font-size:13px;"
```
Replace with:
```
style="color:rgba(255,255,255,.6);font-size:14px;"
```

5g. Make chip font sizes consistent (currently 10px):
Find inside s16 `style="font-size:10px;padding:3px 8px;"` on the method chips:
Replace with `style="font-size:11px;padding:4px 10px;"`

---

## Fix 6 — Slide s17: Build Scale Monetize — remove Phase 3 eyebrow, fix text inconsistencies

**Problems:**
- Eyebrow reads "Playbook · Phase 3" — remove
- "LEVERAGE FIRM ACCELERATORS:" and "COMMERCIAL MODEL:" sub-labels use var(--mid) grey
- Sub-card titles ("AI Value Lab / Workshop", "AI Roadmap Development") are italic at 11px — too small
- Land/Expand/Scale badge chips are at font-size:10px

**Changes:**

6a. Remove "Phase 3" from eyebrow:
Find inside s17:
```
>Playbook &middot; Phase 3<
```
Replace with:
```
>Playbook<
```

6b. Fix both grey sub-labels inside the Scale card:
Find inside s17:
```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase;margin-bottom:6px;font-style:italic;">Leverage firm accelerators:
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.55);text-transform:uppercase;margin-bottom:6px;">Leverage firm accelerators:
```

```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase;margin-bottom:6px;font-style:italic;">Commercial model:
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.55);text-transform:uppercase;margin-bottom:6px;">Commercial model:
```

6c. Make the nested card titles (AI Value Lab, AI Roadmap Development) bold and more readable:
Find inside s17 (2 occurrences):
```
style="font-size:11px;font-weight:600;color:rgba(255,255,255,.85);margin-bottom:6px;font-style:italic;">AI Value Lab / Workshop
```
Replace with:
```
style="font-size:13px;font-weight:700;color:rgba(255,255,255,.92);margin-bottom:6px;">AI Value Lab / Workshop
```

```
style="font-size:11px;font-weight:600;color:rgba(255,255,255,.85);margin-bottom:6px;font-style:italic;">AI Roadmap Development
```
Replace with:
```
style="font-size:13px;font-weight:700;color:rgba(255,255,255,.92);margin-bottom:6px;">AI Roadmap Development
```

6d. Make Land/Expand/Scale badge chips larger and consistent:
Find inside s17:
```
class="chip" style="font-size:10px;padding:3px 8px;margin-bottom:10px;display:inline-block;">Land
```
Replace with:
```
class="chip" style="font-size:12px;padding:4px 12px;margin-bottom:10px;display:inline-block;">Land
```

```
class="chip-c" style="display:inline-block;font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;background:rgba(84,192,232,.1);color:var(--cyan);border:1px solid rgba(84,192,232,.28);margin-bottom:10px;">Expand
```
Replace with:
```
class="chip-c" style="display:inline-block;font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;background:rgba(84,192,232,.1);color:var(--cyan);border:1px solid rgba(84,192,232,.28);margin-bottom:10px;">Expand
```

```
class="chip-t" style="display:inline-block;font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;background:rgba(5,171,140,.1);color:var(--teal);border:1px solid rgba(5,171,140,.28);margin-bottom:10px;">Scale
```
Replace with:
```
class="chip-t" style="display:inline-block;font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;background:rgba(5,171,140,.1);color:var(--teal);border:1px solid rgba(5,171,140,.28);margin-bottom:10px;">Scale
```

---

## Fix 7 — Slide s18: Operating Model & Governance — label sizes and alignment

**Problems:**
- "DECISION RIGHTS" label is `font-size:10px` — too small to read
- Card section headers (Business Lines Own, AI Studio Owns, Joint Ownership) are `font-size:11px` italic — too small
- Left and right columns misalign vertically: left has "DECISION RIGHTS" label above cards, right starts directly with cards — creates a vertical offset
- Large empty space at the bottom of the slide

**Changes:**

7a. Fix the "DECISION RIGHTS" label size:
Find inside s18:
```
style="font-size:10px;font-weight:700;letter-spacing:.14em;color:var(--amber);margin-bottom:2px;">DECISION RIGHTS
```
Replace with:
```
style="font-size:13px;font-weight:700;letter-spacing:.14em;color:var(--amber);margin-bottom:8px;">DECISION RIGHTS
```

7b. Fix all three card section header labels (Business Lines Own, AI Studio Owns, Joint Ownership):
Find inside s18 (3 occurrences of this pattern with varying colors):
```
style="font-size:11px;font-weight:600;font-style:italic;color:var(--amber);margin-bottom:6px;">Business Lines Own
```
Replace with:
```
style="font-size:13px;font-weight:700;color:var(--amber);margin-bottom:8px;">Business Lines Own
```

```
style="font-size:11px;font-weight:600;font-style:italic;color:var(--cyan);margin-bottom:6px;">AI Studio Owns
```
Replace with:
```
style="font-size:13px;font-weight:700;color:var(--cyan);margin-bottom:8px;">AI Studio Owns
```

```
style="font-size:11px;font-weight:600;font-style:italic;color:var(--teal);margin-bottom:6px;">Joint Ownership
```
Replace with:
```
style="font-size:13px;font-weight:700;color:var(--teal);margin-bottom:8px;">Joint Ownership
```

7c. Fix vertical alignment between left and right columns. The left column has a floating "DECISION RIGHTS" label that creates an offset. Add a matching section label above the right column to align them:

Find inside s18 the right column opening div:
```
<div style="display:flex;flex-direction:column;gap:14px;">
        <div class="card" style="padding:16px 18px;">
          <h3 style="margin-bottom:8px;">Success Metrics</h3>
```
Replace with:
```
<div style="display:flex;flex-direction:column;gap:14px;">
        <div style="font-size:13px;font-weight:700;letter-spacing:.14em;color:var(--amber);margin-bottom:8px;visibility:hidden;">METRICS</div>
        <div class="card" style="padding:16px 18px;">
          <h3 style="margin-bottom:8px;">Success Metrics</h3>
```
(The `visibility:hidden` spacer matches the height of the "DECISION RIGHTS" label so both columns start their cards at the same y position.)

7d. Make the right column cards fill the available height:
Add `flex:1;` to the Success Metrics card and the Crowe AI Value Narrative card inside s18.
Find:
```
<div class="card" style="padding:16px 18px;">
          <h3 style="margin-bottom:8px;">Success Metrics</h3>
```
Replace with:
```
<div class="card" style="padding:16px 18px;flex:1;">
          <h3 style="margin-bottom:8px;">Success Metrics</h3>
```

Find:
```
<div class="card card-a" style="padding:16px 18px;">
          <h3 style="margin-bottom:4px;">Crowe AI Value Narrative</h3>
```
Replace with:
```
<div class="card card-a" style="padding:16px 18px;flex:1;">
          <h3 style="margin-bottom:4px;">Crowe AI Value Narrative</h3>
```

7e. Make the "Each business line must clearly articulate:" subtitle larger:
Find inside s18:
```
style="font-size:clamp(11px,1vw,13px);margin-bottom:8px;"
```
Replace with:
```
style="font-size:clamp(13px,1.2vw,15px);margin-bottom:10px;color:rgba(255,255,255,.65);"
```

---

## Verification After Patching

Open the file in a browser and check each slide:

- [ ] s3: Three pillar cards fill the viewport height, no content overlap, text readable
- [ ] s4: Pricing panel is wider, no grey labels, "How we do it" and cards fill the space
- [ ] s14: No Ph.1/Ph.2/Ph.3/All badges, three focus area cards fill height, text larger
- [ ] s15: Eyebrow reads "Playbook" (no Phase 1), all 4 steps visible without clipping
- [ ] s16: Eyebrow reads "Playbook" (no Phase 2), all 4 steps visible, sub-labels readable
- [ ] s17: Eyebrow reads "Playbook" (no Phase 3), Land/Expand/Scale badges consistent size, sub-labels readable
- [ ] s18: "DECISION RIGHTS" is clearly readable, card section headers are bold and larger, left and right columns vertically aligned
- [ ] No other slides were modified
