# Crowe AI Strategy Deck — v21 Patch 3
# Slide s16: Typography uniformity fix

## Overview

Targeted fix for slide s16 only (`Create New Client Value Through AI`).
Edit `Crowe-AI-Strategy-Presentation (Revised-v21).html` in-place.
All changes are find-and-replace within s16. Do not touch any other slide.

The problem: s16 has 6 different font sizes in use across body content (9px, 10px, 11px, 12px, 13px, 14px).
The fix: collapse to a consistent scale — 11px for labels, 13px for secondary content, 14px for body rows.

---

## Fix 1 — Sub-labels: 9px grey → 11px dimmed white (3 instances)

These are the all-caps section labels above lists. All three have the same style string.

Find (all 3 occurrences inside s16):
```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase;margin-bottom:6px;font-style:italic;">Assess:
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.55);text-transform:uppercase;margin-bottom:8px;">Assess:
```

Find:
```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase;margin-bottom:8px;font-style:italic;">Current offerings &rarr; Future client needs
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.55);text-transform:uppercase;margin-bottom:8px;">Current offerings &rarr; Future client needs
```

Find:
```
font-size:9px;font-weight:700;letter-spacing:.12em;color:var(--mid);text-transform:uppercase;margin-bottom:6px;font-style:italic;">Each business line must produce:
```
Replace with:
```
font-size:11px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.55);text-transform:uppercase;margin-bottom:8px;">Each business line must produce:
```

---

## Fix 2 — Method chips: 10px → 11px, padding to match loop chips (4 instances)

These are the amber chips below the Step 1 bullet list (Executive roundtables, AI value labs, etc.).
Currently 10px/3px padding — loop chips below are 11px/4px. Make them match.

Find (all 4 instances inside s16):
```
class="chip" style="font-size:10px;padding:3px 8px;">Executive roundtables
```
Replace with:
```
class="chip" style="font-size:11px;padding:4px 10px;">Executive roundtables
```

```
class="chip" style="font-size:10px;padding:3px 8px;">AI value labs
```
Replace with:
```
class="chip" style="font-size:11px;padding:4px 10px;">AI value labs
```

```
class="chip" style="font-size:10px;padding:3px 8px;">Client listening tours
```
Replace with:
```
class="chip" style="font-size:11px;padding:4px 10px;">Client listening tours
```

```
class="chip" style="font-size:10px;padding:3px 8px;">Market trend synthesis
```
Replace with:
```
class="chip" style="font-size:11px;padding:4px 10px;">Market trend synthesis
```

---

## Fix 3 — Gap analysis rows: 13px → 14px, "before" opacity .4 → .62 (4 rows, 2 spans each)

The "before" text (Annual audit, Sample testing, etc.) is nearly invisible at .4 opacity.
Both before and after spans should be 14px. Before text raised to .62 opacity — still clearly
secondary but actually readable.

Find (4 occurrences — the "before" span in each row):
```
style="color:rgba(255,255,255,.4);font-size:13px;"
```
Replace with:
```
style="color:rgba(255,255,255,.62);font-size:14px;"
```

Find (4 occurrences — the "after" span in each row):
```
style="color:rgba(255,255,255,.85);font-size:13px;"
```
Replace with:
```
style="color:rgba(255,255,255,.92);font-size:14px;font-weight:600;"
```

---

## Fix 4 — Sub-card titles: 10px italic → 13px bold (2 instances)

"Low-code innovation pods" and "Pro-code accelerators" inside the Step 3 development model cards.

Find inside s16:
```
style="font-size:10px;font-weight:600;font-style:italic;color:var(--teal);margin-bottom:4px;">Low-code innovation pods
```
Replace with:
```
style="font-size:13px;font-weight:700;color:var(--teal);margin-bottom:6px;">Low-code innovation pods
```

Find inside s16:
```
style="font-size:10px;font-weight:600;font-style:italic;color:var(--cyan);margin-bottom:4px;">Pro-code accelerators
```
Replace with:
```
style="font-size:13px;font-weight:700;color:var(--cyan);margin-bottom:6px;">Pro-code accelerators
```

---

## Fix 5 — Sub-card body text: 12px → 13px (2 instances)

"Business-led" and "AI Studio-led" body text inside the Step 3 sub-cards.

Find inside s16 (both instances):
```
<p style="font-size:12px;color:rgba(255,255,255,.65);">Business-led</p>
```
Replace with:
```
<p style="font-size:13px;color:rgba(255,255,255,.75);">Business-led</p>
```

```
<p style="font-size:12px;color:rgba(255,255,255,.65);">AI Studio-led</p>
```
Replace with:
```
<p style="font-size:13px;color:rgba(255,255,255,.75);">AI Studio-led</p>
```

---

## Fix 6 — Slide subtitle: too small at clamp(12px,1.1vw,14px)

The italic subtitle under the h2 ("Ensure offerings remain relevant...") is smaller than
the rest of the body content. Bring it in line.

Find inside s16:
```
style="font-size:clamp(12px,1.1vw,14px);">Ensure offerings remain relevant
```
Replace with:
```
style="font-size:clamp(14px,1.3vw,16px);color:rgba(255,255,255,.65);">Ensure offerings remain relevant
```

---

## Resulting type scale for s16 after all fixes

| Element                          | Size   | Color/Opacity              |
|----------------------------------|--------|----------------------------|
| h2 (slide title)                 | global | white                      |
| Slide subtitle                   | 14–16px | rgba(255,255,255,.65)     |
| h3 (step titles)                 | global | white                      |
| Sub-labels (ASSESS: etc.)        | 11px   | rgba(255,255,255,.55)      |
| .slist body bullets              | global | rgba(255,255,255,.82)      |
| Gap analysis "before" text       | 14px   | rgba(255,255,255,.62)      |
| Gap analysis "after" text        | 14px bold | rgba(255,255,255,.92)   |
| Method chips + loop chips        | 11px   | amber / teal (consistent)  |
| Sub-card titles                  | 13px bold | teal / cyan             |
| Sub-card body                    | 13px   | rgba(255,255,255,.75)      |

---

## Verification

Open the file in a browser, navigate to slide 12 (s16), and confirm:
- [ ] "ASSESS:", "CURRENT OFFERINGS →", "EACH BUSINESS LINE MUST PRODUCE:" are readable white labels
- [ ] All four method chips match the size of the loop chips (Hypothesize, Test, etc.)
- [ ] Gap analysis "before" text (Annual audit, Sample testing...) is clearly readable, not near-invisible
- [ ] "Low-code innovation pods" and "Pro-code accelerators" are bold and match body text scale
- [ ] No element on the slide appears noticeably larger or smaller than its neighbours
- [ ] No other slides were modified
