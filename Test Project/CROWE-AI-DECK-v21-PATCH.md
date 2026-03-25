# Crowe AI Strategy Deck — v21 Patch Instructions

## Overview

These are targeted fixes for `Crowe-AI-Strategy-Presentation (Revised-v21).html`.
Edit in-place — no new file needed. All fixes are find-and-replace or targeted edits.
Read all five issues before starting. Do not touch any slide not listed here.

---

## Fix 1 — Remove Phase numbering from Playbook eyebrows (s15, s16, s17)

**Problem:** The playbook slides use "Phase 1 / Phase 2 / Phase 3" labels in their eyebrows.
This phasing structure should be removed entirely. The eyebrow on all playbook slides
should read simply `Playbook`.

**Three exact find-and-replace operations:**

Find:
```
Playbook &middot; Phase 1
```
Replace with:
```
Playbook
```

Find:
```
Playbook &middot; Phase 2
```
Replace with:
```
Playbook
```

Find:
```
Playbook &middot; Phase 3
```
Replace with:
```
Playbook
```

Also check the `<div class="stag">` section tag and any other text inside s15, s16, s17
that references "Phase 1", "Phase 2", or "Phase 3" — remove those references too.
The word "Phase" should not appear anywhere in the playbook slides after this fix.

---

## Fix 2 — Content bug: Option C missing label text (slide s15)

**Slide:** s15 (Incremental Improvement Playbook)
**Problem:** Option C title reads "Option C — Reinvest Capacity" — missing "into Client Value"

**Find:**
```
Option C &mdash; Reinvest Capacity <span
```

**Replace with:**
```
Option C &mdash; Reinvest Capacity into Client Value <span
```

---

## Fix 3 — Font too small + too dim: sub-labels on new slides (s15, s16, s17)

**Problem:** Six micro-label divs use `font-size:9px` with `color:var(--mid)` (#828282).
These are the small all-caps section labels like "Evaluate each component:",
"Leverage firm accelerators:", "Commercial model:", "Assess:", etc.
They are illegible on a projector.

**Find this exact style string (appears 6 times total across s15, s16, s17):**
```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.55);text-transform:uppercase
```

**Also fix this variant in s14 (the "MINIMUM EXECUTION STANDARD" label):**

Find:
```
font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:8px
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:8px
```

Note: The `font-size:9px;font-weight:700;letter-spacing:.16em;color:var(--amber)` variant
in s17 (the "OVERARCHING CAPABILITY" label) is amber and intentional — **do not change it.**

---

## Fix 4 — Font too small: phase badges and "Preferred" badge (s14, s15)

**Problem:** Phase badges (Ph.1, Ph.2, Ph.3, All) on slide s14 use `font-size:8px`.
The "Preferred" chip on slide s15 also uses `font-size:8px`. Both are too small to read.

**For s14 — find all four badge spans:**
Find:
```
font-size:8px;font-weight:700;padding:2px 6px;border-radius:3px;margin-right:4px
```
Replace with:
```
font-size:11px;font-weight:700;padding:2px 6px;border-radius:3px;margin-right:4px
```

**For s15 — find the "Preferred" chip:**
Find (inside slide s15 only):
```
class="chip-t" style="display:inline-block;font-size:8px;font-weight:700;padding:2px 6px
```
Replace with:
```
class="chip-t" style="display:inline-block;font-size:11px;font-weight:700;padding:2px 6px
```

---

## Fix 5 — Text too dim: "TBD" on AI Data Transformation card (slide s4)

**Problem:** The "TBD" text on the AI Data Transformation pricing entry renders at
`rgba(255,255,255,.3)` — nearly invisible against the dark background.

**Find (in slide s4):**
```
font-size:14px;font-style:italic;color:rgba(255,255,255,.3)
```
**Replace with:**
```
font-size:14px;font-style:italic;color:rgba(255,255,255,.52)
```

---

## Verification After Patching

Open the file in a browser and check:

- [ ] Slides 11–13 (s15, s16, s17): Eyebrow reads "Playbook" — no "Phase 1/2/3" anywhere
- [ ] No other instances of "Phase 1", "Phase 2", or "Phase 3" remain in any playbook slide
- [ ] Slide 3 (s4): "TBD" in pricing panel is readable (not near-invisible)
- [ ] Slide 10 (s14): Ph.1, Ph.2, Ph.3, All badges are readable
- [ ] Slide 10 (s14): "MINIMUM EXECUTION STANDARD" label is readable
- [ ] Slide 11 (s15): "Evaluate each component:" label is readable
- [ ] Slide 11 (s15): Option C reads "Reinvest Capacity into Client Value"
- [ ] Slide 11 (s15): "Preferred" badge is readable
- [ ] Slide 12 (s16): "Assess:", "Current offerings →", "Each business line must produce:" labels are readable
- [ ] Slide 13 (s17): "Leverage firm accelerators:" and "Commercial model:" labels are readable
- [ ] No other slides were modified
