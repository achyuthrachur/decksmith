# Crowe AI Strategy Deck — v21 Patch 4
# Slide s15: Step 1 box font size fix + s8 missing content

## Overview

Two fixes in this patch:
1. s15 — Step 1 list items rendering at global body size due to CSS specificity issue
2. s8 — Missing "Competitive edge / 100% Coverage" value row

Edit `Crowe-AI-Strategy-Presentation (Revised-v21).html` in-place.

---

## Fix 1 — s15: Step 1 list items too large (CSS specificity bug)

### Why the previous fix didn't work

The `font-size:clamp(12px,1.1vw,14px)` override is set on the `<ul class="slist">` element.
But the global stylesheet has `.slist li { font-size:clamp(15px,1.35vw,18px); }` — this
rule targets `<li>` directly and wins over any inherited font-size from the parent `<ul>`.
So all list items in the Step 1 card render at full body size (~18px) regardless of the
override on the `<ul>`.

### The fix

Add a scoped CSS override to the `<style>` block. This is the only reliable way to beat
the specificity of the global `.slist li` rule.

**Step 1a — Find the end of the `<style>` block.**
Look for the closing `</style>` tag in `<head>`. Just before it, add the following block:

```css
  /* ══════════════════════════════════
     PLAYBOOK SLIDE OVERRIDES
  ══════════════════════════════════ */
  #s15 .slist li,
  #s16 .slist li {
    font-size: clamp(12px, 1.1vw, 14px);
    line-height: 1.45;
  }
```

This scopes the override to s15 and s16 only (s16 has the same density requirement)
without touching any other slide.

**Step 1b — Remove the now-redundant inline font-size overrides on `<ul>` elements in s15.**

After adding the CSS rule above, the inline `font-size` on each `<ul class="slist">` in s15
is redundant but harmless. Leave them in place — do not remove them.

### Verification for Fix 1
After adding the CSS rule, open the file and navigate to slide 11 (s15).
The Step 1 "Decompose Offerings" card should show 9 items in a 2-column grid where
each item is noticeably smaller than the body text on other slides — roughly the size
of the caption text on slide 3. If the items are still large, the CSS rule was not
inserted before `</style>`.

---

## Fix 2 — s8: Missing "Competitive edge / 100% Coverage" value row

### What's missing

The original v20 deck had 5 value outcome rows on the Create Value slide.
v21 only has 4. The fifth row was dropped during the rebuild:

> **◆ Competitive edge** / **100% COVERAGE** — Analyze 100% of transactions — not just samples

This row belongs after "Better decisions" as the fifth and final value card.

### The fix

**Find the closing of the four-card value outcomes grid in slide s8.**
The grid currently ends with the "Better decisions" card. It looks like this:

```html
<div class="card card-t" ...>
  <div ...>◆ Better decisions</div>
  <div ...>Weekly, not quarterly</div>
  <div ...>Insights delivered on a continuous cadence</div>
</div>
```

After the closing `</div>` of the "Better decisions" card, and before the horizontal
rule / divider that separates the value outcomes from "How We Do It", insert this
fifth card using the same structure and classes as the other four:

```html
<div class="card card-t" style="[match the padding/style of the other four cards exactly]">
  <div style="[match the label style]">&#9670; Competitive edge</div>
  <div style="[match the headline style]">100% coverage</div>
  <div style="[match the detail style]">Analyze 100% of transactions — not just samples</div>
</div>
```

**Important:** Match the exact inline style attributes from the other four value cards.
Do not invent new styles. Copy the structure of any adjacent card and swap in the content above.

Also update the grid from `grid-template-columns: repeat(4, 1fr)` to
`grid-template-columns: repeat(5, 1fr)` so all five cards sit in one row.
If `repeat(5,1fr)` makes the cards too narrow, use `grid-template-columns: repeat(3,1fr)`
for the top row and place the 4th and 5th cards in a second row — but try 5-column first.

---

## Verification After Patching

- [ ] s15: Navigate to slide 11 — Step 1 box shows 9 items in 2 columns at small readable size,
      not dominating the top half of the slide. All 4 step cards are visible without scrolling.
- [ ] s16: List items in all 4 cards are the same size as s15 (same CSS rule applies)
- [ ] s8: Navigate to slide 5 — five value outcome cards visible: Lower risk, Faster growth,
      Reduced cost, Better decisions, Competitive edge
- [ ] No other slides were modified
