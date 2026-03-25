# Claude Code Instructions: Crowe AI Strategy Presentation Revisions
**File to edit:** `Crowe-AI-Strategy-Presentation (Animated - Updated).html`
**Location:** `C:\Users\RachurA\AI Coding Projects\decksmith\Test Project\`

> **Important before starting:** This file is ~30MB because images are base64-encoded inline. When replacing images, encode the new image file to base64 and embed it directly in the `style="background-image:url('data:image/...;base64,...')"` attribute. Never reference local file paths — every image must be embedded as base64.

---

## GLOBAL CHANGES (Apply across all slides before touching individual slides)

### 1. Increase base font sizes globally
In the `<style>` block, update these rules:

```css
/* CURRENT → CHANGE TO */
p  { font-size: clamp(14px, 1.25vw, 17px); ... }
   → font-size: clamp(15px, 1.45vw, 20px);

li { font-size: clamp(13.5px, 1.2vw, 16px); ... }
   → font-size: clamp(15px, 1.35vw, 18px);

h2 { font-size: clamp(30px, 3.6vw, 50px); ... }
   → font-size: clamp(34px, 4vw, 58px);

h3 { font-size: clamp(14px, 1.35vw, 18px); ... }
   → font-size: clamp(16px, 1.55vw, 21px);

td { font-size: clamp(13px, 1.15vw, 15px); ... }
   → font-size: clamp(14px, 1.3vw, 17px);

.eyebrow { font-size: 11px; ... }
         → font-size: 12.5px;

.mlbl { font-size: 12.5px; ... }
      → font-size: 13.5px;
```

### 2. Remove or disable overly distracting animations
Remove the following CSS animation classes entirely (or set `animation: none`):

- `.neon-card` — remove the `neonPulse` animation (keep the class but set `animation: none`)
- `.gradient-text` on the title — replace the flowing gradient animation with a static amber color. Change:
  ```css
  .gradient-text {
    /* Remove animation, just use solid amber */
    color: var(--amber);
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: var(--amber);
    background-clip: unset;
    animation: none;
  }
  ```
- `.glitch-text::before` and `.glitch-text::after` — set `animation: none` on both pseudo-elements. The glitch effect is too distracting for senior leadership.
- `.aurora-bg` — set `animation: none; opacity: 0.3;` to keep a subtle background without constant movement.
- `.animated-grid` — reduce opacity and slow the pulse: change `gridPulse` keyframes to `0%,100% { opacity: 0.015; } 50% { opacity: 0.03; }` and set `animation-duration: 8s`.
- `.shimmer` — set `animation: shimmer 8s ease-in-out infinite` (slow it way down from 4s).

### 3. Fix entrance animations to apply uniformly
The `fadeUp` / `.ani` class animation is staggered by `:nth-child()`. The problem is it only animates children 1–8 of the immediate parent. Ensure every `.ani` element inside `.slide.active` gets animated. The CSS already handles this correctly — the issue is likely in the JavaScript `initSlide` functions where only specific elements are targeted. When you reach the per-slide JS init functions, ensure all `.ani` elements in each slide get the animation treatment, not just the first few.

---

## SLIDE-BY-SLIDE CHANGES

---

### S1 — Title Slide (`id="s1"`)
**Layout:** `.l-title` (content left 55%, image right 45%)

**Changes:**
1. The left content panel text is already decent size but can go bigger. Find the `<h1>` inside `#s1` and increase the font size:
   ```html
   <!-- Find the h1 and update its inline clamp if any, or rely on global h1 rule -->
   h1 { font-size: clamp(54px, 6.5vw, 92px); } /* increase from clamp(48px,5.8vw,82px) */
   ```
2. The tagline `.title-tagline` — increase font size:
   ```html
   style="font-size:clamp(18px,2vw,26px); ..."  /* was clamp(16px,1.7vw,22px) */
   ```
3. **Image replacement needed:** The `.t-right .bg` div (right panel). Replace the base64 data with the new title image provided. Keep the existing gradient overlays.

4. Remove the `.glitch-target` class from the "AI Strategy" span (handled in global step above — just confirm it's applied here).

---

### S2 — Why Now (`id="s2"`)
**Layout:** `.l-right` (content left 57%, image right 43%)

**Changes:**
1. **Rebalance the grid:** Change the layout columns from `57% 43%` to `65% 35%` for this slide specifically:
   ```html
   <!-- Add an override on the slide itself -->
   <div class="slide l-right g-grid" id="s2" style="grid-template-columns: 65% 35%;">
   ```

2. **Restructure the content layout inside `#s2 .inner`:**
   Currently the content is a 2-column grid inside: `grid-template-columns:60% 40%`. The "What Inaction Costs" stats are in the 40% column beside the table.
   
   Change this to a single-column layout:
   - The `<table>` (Forces) takes full width
   - Below the table: the 3 stat boxes ("~12%", "<20%", "3–4×") arranged in a horizontal row (3 columns, equal width) instead of stacked vertically
   - This moves stats below the table and gives the table more horizontal room
   
   Find this section in `#s2`:
   ```html
   <div class="ani mt14" style="display:grid;grid-template-columns:60% 40%;gap:16px;flex:1;align-content:start;">
     <div>  <!-- table -->  </div>
     <div style="display:flex;flex-direction:column;gap:10px;">  <!-- stats -->  </div>
   </div>
   ```
   Replace with:
   ```html
   <div class="ani mt14 fc g14" style="flex:1;align-content:start;">
     <!-- Table takes full width -->
     <div> [keep table HTML exactly as-is] </div>
     <!-- Stats now in a horizontal row below -->
     <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:4px;">
       [move the 3 stat divs here side by side]
     </div>
   </div>
   ```

3. **Fix the grey closing text contrast.** Find these two paragraphs at the bottom of `#s2 .inner`:
   ```html
   <p class="closing-l1" style="color:rgba(255,255,255,.5); ...">
   <p class="closing-l2" style="... color:var(--white); ...">
   ```
   Change `closing-l1` opacity from `.5` to `.75`:
   ```html
   style="color:rgba(255,255,255,.75); ..."
   ```

4. **Stat box font sizes** — increase the number sizes inside the 3 stat boxes:
   Change `font-size:clamp(28px,3.2vw,44px)` → `font-size:clamp(32px,3.6vw,50px)` on each `.stat-12`, `.stat-20`, `.stat-3x` span.

5. **ADD MISSING CONTENT: The "Opportunity" section.** The source content includes a critical affirmative section about Crowe's competitive position that is entirely absent from the current slide. The slide currently only frames the threat — it never pivots to why Crowe is well-positioned. This must be added.

   Insert a new `.ani` block **between the stat row and the closing "lead or respond" line**. Place it after the stats grid and before the `<div class="ani mt14" style="border-top:...">` closing block.

   Add the following HTML exactly:
   ```html
   <div class="ani mt14">
     <div style="background:rgba(5,171,140,.07);border:1px solid rgba(5,171,140,.2);border-radius:10px;padding:16px 20px;">
       <div style="font-size:9.5px;font-weight:700;letter-spacing:.16em;color:var(--teal);margin-bottom:10px;">THE OPPORTUNITY</div>
       <ul class="slist">
         <li>We have the domain expertise, client trust, and industry credibility competitors cannot easily replicate</li>
         <li>AI doesn't replace that advantage — it amplifies it</li>
         <li>But only if we act with structure, speed, and intent</li>
       </ul>
     </div>
   </div>
   ```

   This uses the teal card treatment (`.card-t` style) to visually distinguish the opportunity from the amber threat framing above it, and positions it as a bridge into the closing "lead or respond" statement.

---

### S3 — Three Pillars (`id="s3"`)
**Layout:** `.l-full` (full bleed background)

**Changes:**
1. **Slow/remove the vertical scan animation.** In the JavaScript, find the `initShootingStars` or any canvas-based scan effect called for `#s3`. If there is a `s3-particles` canvas being initialized with particle/scan effects, change the options:
   - Reduce `quantity` from whatever it is to `20`
   - Reduce alpha/opacity significantly
   - Or pass `{ quantity: 0 }` to effectively disable it

2. **Card layout — change from 3 equal columns to 2+1:**
   Find the three-column card grid inside `#s3 .f-content`:
   ```html
   <div class="three ani mt20" style="flex:1;align-content:start;">
     <div class="card card-a ...">  <!-- Sell AI -->
     <div class="card card-t ...">  <!-- Improve -->
     <div class="card card-c ...">  <!-- Create Value -->
   ```
   Change the layout to 2 cards on top, 1 card spanning full width on bottom:
   ```html
   <div class="ani mt20" style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:14px;align-content:start;">
     <div class="card card-a ...">  <!-- Sell AI — top left -->
     <div class="card card-t ...">  <!-- Improve — top right -->
     <div class="card card-c ..." style="grid-column:1/-1;">  <!-- Create Value — full width bottom -->
   ```

3. **Increase card text sizes** — inside each of the 3 cards, the `h3` and `p` will pick up the global size increase. But also increase the `.pnum` number size:
   ```css
   .pnum { font-size: 50px; } /* was 44px */
   ```

4. **Keep only the hover border animation on cards** (the `.border-beam` or mouse spotlight effect). The entrance animation (`.ani` fadeUp) is fine to keep.

5. **The aurora-bg** inside this slide's `bg-ov` div — apply the global slowdown from the global changes section.

---

### S4 — Sell AI P1 (`id="s4"`)
**Layout:** `.l-right` (content left 57%, image right 43%)

**Changes:**
1. **Image replacement needed:** The `.i-pane` div. This currently has a base64 image. Replace with the new revenue/go-to-market image. Encode the new image as base64 and replace the value in `style="background-image:url('data:image/...;base64,...')"`.

2. **Increase left padding** on the content pane to prevent too much open blue on the left. In the `#s4 .c-pane`, add or increase left padding:
   The global rule sets `padding: 7vh 40px 3.5vh 56px`. Override for this slide:
   ```html
   <div class="c-pane" style="padding: 7vh 40px 3.5vh 72px;">
   ```

3. **Move the go-to-market pipeline lower** — add `margin-top: 20px` to the pipeline/arrow section (the Assessment → Implementation → Managed Service row and the SVG below it).

4. **Enlarge the pipeline bar text:**
   The three boxes in the pipeline (Assessment, Implementation, Managed Service) have `font-size:11px`. Change to `font-size:13px`.
   The SVG `<text>` labels also have `font-size="11"` — change to `font-size="13"`.

5. **ELEVATE the 3 named industry verticals — this is a content priority.** The source document explicitly names Financial Services, Life Sciences, and Government as the three go-to-market focus verticals. Currently they are buried as a single bullet point inside the "GO-TO-MARKET" card. They need to be visually prominent — treated as named focal points, not an afterthought.

   Find the "GO-TO-MARKET" card inside `#s4`. It currently reads:
   ```html
   <li>Lead with industry-specific use cases: Financial Services, Life Sciences, Government</li>
   ```
   
   Replace that single list item with a dedicated visual row. After the remaining list item ("Position Crowe as the trusted AI implementation partner..."), add a new section below the `</ul>` closing tag:
   ```html
   <div style="margin-top:14px;border-top:1px solid rgba(245,168,0,.15);padding-top:12px;">
     <div style="font-size:9.5px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:10px;">FOCUS VERTICALS</div>
     <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
       <div style="background:rgba(245,168,0,.1);border:1px solid rgba(245,168,0,.25);border-radius:8px;padding:10px 12px;text-align:center;">
         <div style="font-size:13px;font-weight:700;color:var(--amber);">Financial Services</div>
       </div>
       <div style="background:rgba(245,168,0,.07);border:1px solid rgba(245,168,0,.18);border-radius:8px;padding:10px 12px;text-align:center;">
         <div style="font-size:13px;font-weight:700;color:var(--amber);">Life Sciences</div>
       </div>
       <div style="background:rgba(245,168,0,.07);border:1px solid rgba(245,168,0,.18);border-radius:8px;padding:10px 12px;text-align:center;">
         <div style="font-size:13px;font-weight:700;color:var(--amber);">Government</div>
       </div>
     </div>
   </div>
   ```

   Also remove the now-redundant bullet point that listed them inline so there's no duplication.

6. **Global text size increase** applies here — no additional font changes needed beyond that.

---

### S5 — Sell AI P2 (`id="s5"`)
**Layout:** `.l-right` (content left 57%, image right 43%)

**Changes:**
1. **Image fix (CRITICAL):** This slide currently has a broken local path:
   ```html
   <div class="i-pane" style="background-image:url('./public/images/value-transformation.png')...">
   ```
   Replace with base64-encoded version of the new image. Encode the replacement image file and update the style attribute.

2. **Fix the animation inconsistency** — only 2 metric cards are highlighted. Find the two metric cards (`card card-a` with "70%+" and the unnamed card with "3"). Both should have the same visual treatment. Remove any special `.neon-card` or `.border-beam` classes from whichever one has them, and apply the same base `.card` or `.card-a` styling to both.

3. **Add the 3 named industry verticals** to the "HOW WE MEASURE SUCCESS" card or add a new row below it:
   ```html
   <!-- Add this after the existing "HOW WE MEASURE SUCCESS" card -->
   <div class="card" style="background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.08);padding:14px 18px;">
     <div style="font-size:9.5px;font-weight:700;letter-spacing:.16em;color:var(--mid);margin-bottom:8px;">FOCUS VERTICALS</div>
     <div style="display:flex;gap:8px;">
       <span class="chip">Financial Services</span>
       <span class="chip">Life Sciences</span>
       <span class="chip">Government</span>
     </div>
   </div>
   ```

---

### S6 — Improve (`id="s6"`)
**Layout:** `.l-left` (image left 40%, content right 60%)

**Changes:**
1. **Image replacement needed:** The `.i-pane` div. Replace the current base64 image with the new operations/delivery improvement image.

2. **Fix animation inconsistency** — only one card is currently animated/highlighted. Ensure all `.card` elements inside `#s6 .inner` have the same visual weight. Remove any `.neon-card`, `.border-beam`, or `.shine-border` classes from whichever single card has them. All three metric boxes should look identical in terms of animation.

3. **Align look/feel with other pillar slides** — if S3 (Three Pillars) has a specific card style that gets standardized, apply the same treatment here. Check that the teal accent color (`var(--teal)`) is consistently applied to labels and numbers across all three metric boxes.

---

### S7 — Create Value P1 (`id="s7"`)
**Layout:** `.l-right` (content left 57%, image right 43%)

**Changes:**
1. **Image replacement needed:** The `.i-pane` div. Replace the "crystals" base64 image with the new client transformation/value delivery image.

2. **Fix the Step 2 animation inconsistency.** In `#s7`, find the step rows. Step 2 (`class="step-row step-2"`) has special styling:
   ```html
   <p class="step-old" style="...text-decoration:line-through;">How can we use AI...</p>
   <p class="step-new" style="...opacity:0;display:none;">Where in our client's value chain...</p>
   ```
   The `step-new` text is hidden (`opacity:0;display:none`). This is intentional as an animation trigger, but if there's JavaScript that's supposed to reveal it on slide entry and it's broken, fix it. If no JS handles it, change `step-new` to be visible by default:
   ```html
   <p class="step-new" style="font-size:13px;font-weight:600;color:var(--cyan);margin-top:3px;">
   ```
   And remove the `step-old` strikethrough paragraph, or keep both with the old one faded:
   ```html
   <p class="step-old" style="font-size:11px;color:rgba(255,255,255,.3);text-decoration:line-through;margin-bottom:3px;">
   ```
   All 6 steps should have consistent visual styling — same background, same border, same text color treatment.

3. **Increase text size** on step labels and descriptions (global change handles this partially, but also check the inline font-size values in each step row and bump up by ~1-2px if they're still small).

---

### S8 — What Client Value Looks Like (`id="s8"`)
**Layout:** `.l-right` (content left 57%, image right 43%)

**Changes:**
1. **Image fix (CRITICAL):** This slide currently has a broken local path:
   ```html
   <div class="i-pane" style="background-image:url('./public/images/demo-surface.png')...">
   ```
   Replace with base64-encoded version of the new contextually relevant image.

2. **Fix the lightning bolt color inconsistency.** In the table body, find the "Competitive edge" row:
   ```html
   <tr><td>&#9889; Competitive edge</td>...
   ```
   The `&#9889;` (⚡) emoji renders in amber/orange. Wrap just the text label in a span to normalize:
   ```html
   <td><span style="color:rgba(255,255,255,.82);">⚡ Competitive edge</span></td>
   ```
   Or replace `&#9889;` with a simple `★` or `◆` symbol that inherits the cell's white color naturally.

3. **Add the "HOW CROWE IS DESIGNED TO HELP" chips section** — check that this section exists and is visible. If the `.how-crowe-header` is being cut off, remove any `overflow:hidden` constraints on the parent `.inner` div for this slide.

---

### S9 — Case Study (`id="s9"`)
**Layout:** `.l-full` (full bleed background)

**Changes:**
1. **Move the blockquote below the Before/After table** to give the table more room.
   
   Find the bottom grid section in `#s9 .f-content`:
   ```html
   <div class="ani mt20" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;...">
     <div>  <!-- Before/After table -->  </div>
     <div class="fc g12">  <!-- blockquote -->  </div>
   </div>
   ```
   Change to a single column, table first then quote:
   ```html
   <div class="ani mt20 fc g14" style="flex:1;">
     <div> [keep Before/After table HTML] </div>
     <div> [keep blockquote HTML] </div>
   </div>
   ```

2. **Add top spacing** between the eyebrow/title area and the 3-column pillar cards below.
   Find `<div class="ani mt14"` that wraps the 3 pillar cards and change `mt14` to `mt20`:
   ```html
   <div class="ani mt20" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;">
   ```

3. **Increase text sizes inside the 3 pillar cards** — the `p` tags inside `#s9 .pillar-card` have inline `font-size:clamp(13.5px,1.2vw,15.5px)`. Update to `clamp(15px,1.4vw,17.5px)`.

---

### S10 — Demos (`id="s10"`)
**Layout:** `.l-full` (full bleed background)

**Changes:**
1. **Add more vertical spacing** between elements. Add `margin-top: 24px` to the three-card grid below the blockquote.

2. **Link the demo tools.** The three cards (Alert Review Analyst, Competency Center Use Cases, Industry-Specific Builds) should have clickable links. Wrap each card's `h3` in an anchor tag, or make the card itself a link. For now, add placeholder `href="#"` that can be updated with real URLs:
   ```html
   <!-- Card 1 — wrap in anchor or add a link below the p tag -->
   <a href="[ALERT_REVIEW_ANALYST_URL]" target="_blank" 
      style="display:inline-block;margin-top:10px;font-size:11px;font-weight:700;
             letter-spacing:.12em;color:var(--amber);text-decoration:none;
             border-bottom:1px solid rgba(245,168,0,.3);">
     OPEN DEMO →
   </a>
   ```
   Add this link pattern to all three cards with appropriate URLs.

3. **Increase spacing** inside the `max-width:680px` content wrapper — add `gap:20px` and `padding-top:8px` to push content down from the top edge.

---

### S11 — Operating Model (`id="s11"`)
**Layout:** `.l-left` (image left 40%, content right 60%)

**Changes:**
1. **Reduce image panel width** — change the grid columns from `40% 60%` to `30% 70%` for this slide:
   ```html
   <div class="slide l-left g-grid" id="s11" style="grid-template-columns: 30% 70%;">
   ```

2. **Increase table font sizes** — the two tables inside `#s11` (START NOW and BUILD TOWARD) have the global `td` size but also check inline styles. If any `font-size` is hardcoded smaller than the global update, remove those inline overrides.

3. **Add spacing between the two tables** — find the two `<div>` blocks wrapping each table and ensure there's at least `margin-top: 20px` between them (the parent `fc g16` gap:16px may already handle this — verify).

---

### S12 — 18-Month Goals (`id="s12"`)
**Layout:** `.l-full` (full bleed background)

**Changes:**
1. **Fix animation — apply to all goal items, not just one.** 
   In the JavaScript, find wherever `#s12` slide initialization happens. Look for any specific targeting of `.ai-champion` or a single `.goal-item`. The `.goal-item` elements should all animate in with staggered `fadeUp` — ensure none are being skipped.
   
   If the issue is that only the last `.goal-item.hi` (AI Champions) has a special class triggering animation, remove any special JS targeting and let the global `.ani` / `fadeUp` handle all items uniformly. Add `class="ani"` to each `.goal-item` wrapper if not already present — but check if they're already inside an `.ani` wrapper div.

2. **Convert "All Competency Centers" to match percentage format.** 
   Find the last `.goal-item.hi`:
   ```html
   <div class="goal-num gn-all" style="font-size:20px;line-height:1.3;">All Competency<br>Centers</div>
   <div class="goal-desc">Active AI Champions driving adoption...</div>
   ```
   Change to:
   ```html
   <div class="goal-num gn-all">100%</div>
   <div class="goal-desc">of Competency Centers with active AI Champions driving adoption, coaching, and reusable-asset development</div>
   ```

3. **Add spacing** — increase the `gap` on the `.goal-grid` from `14px` to `18px`, and ensure the grid has `margin-top: 8px` from the heading above it.

4. **Increase goal number sizes** — `.goal-num` is currently `font-size:38px`. Change to `font-size:44px`.

---

### S13 — Closing (`id="s13"`)
**Layout:** `.l-full` (full bleed background)

**Changes:**
1. **Add more vertical spacing** between elements. The content is inside `max-width:700px`. Add more `margin-top` between items:
   - `.rule` div: `margin-bottom: 20px` (was likely less)
   - After the `h2`: ensure `mt16` is at least `mt20`
   - After the paragraph: ensure `mt20` is at least `mt24`

2. **Slow down the shooting stars canvas animation** (`id="s13-stars"`). In the JavaScript where `initShootingStars('s13-stars', {...})` is called, update the options:
   ```js
   initShootingStars('s13-stars', { minSpeed: 6, maxSpeed: 14, minDelay: 1800, maxDelay: 4000 });
   ```
   (Was likely `minSpeed:12, maxSpeed:28, minDelay:800, maxDelay:2500`)

3. **Slow down the particles canvas** (`id="s13-particles"`). Find `initParticles('s13-particles', {...})` and reduce quantity:
   ```js
   initParticles('s13-particles', { quantity: 25, color: '#F5A800', size: 0.4, ease: 90, staticity: 55 });
   ```

---

## IMAGE REPLACEMENT CHECKLIST

When the user provides new image files, base64-encode each one and replace the `data:image/...;base64,...` value in these exact locations:

| Slide | Element | Search for | Notes |
|-------|---------|------------|-------|
| S1 | `#s1 .t-right .bg` | `style="background-image:url('data:image/png;base64,iVBOR...` (first base64 image in file, around line 648) | Title hero image |
| S4 | `#s4 .i-pane` | base64 image on the `i-pane` div in slide `id="s4"` | Revenue/go-to-market theme |
| S5 | `#s5 .i-pane` | `url('./public/images/value-transformation.png')` — this is a broken local path, must be replaced with base64 | Revenue/business development |
| S6 | `#s6 .i-pane` | base64 image on the `i-pane` div in slide `id="s6"` | Ops/delivery improvement |
| S7 | `#s7 .i-pane` | base64 image on the `i-pane` div in slide `id="s7"` | Client transformation/value |
| S8 | `#s8 .i-pane` | `url('./public/images/demo-surface.png')` — broken local path, must be replaced with base64 | Client outcomes/insights |

To base64-encode an image file in Node.js (for Claude Code to run):
```js
const fs = require('fs');
const data = fs.readFileSync('./path/to/image.png');
const b64 = data.toString('base64');
console.log('data:image/png;base64,' + b64);
```
Then paste the output as the `url(...)` value.

---

## DATA VISUALIZATIONS & INFOGRAPHICS

> **Implementation note:** This is a standalone HTML file — React/ShadCN components cannot be used directly. Instead, use **Chart.js via CDN** for data charts and **inline SVG** for infographic elements. The visual output is identical to ShadCN's chart components (which are just Recharts wrappers around the same SVG/Canvas primitives).

### Step 0 — Add Chart.js to the page
In the `<head>` block, add the Chart.js CDN script alongside the existing GSAP script. Place it **before** the closing `</head>` tag:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
```

Also add this global Chart.js defaults block at the **top of the existing `<script>` tag**, before any other JS:
```js
// Global Chart.js defaults — matches Crowe dark theme
Chart.defaults.color = 'rgba(255,255,255,0.6)';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'DM Sans', Arial, sans-serif";
Chart.defaults.font.size = 12;
```

---

### CHART 1 — S2: AI Utilization Gap (Horizontal Bar)

**Purpose:** Replace the plain "~12%" stat box with a visual bar that shows how much headroom exists. Seeing 12% filled and 88% empty is far more striking than a number alone.

**Where to place it:** Inside `#s2`, replace the first stat box (the `~12%` amber card) with a `<canvas>` element. Keep the `<20%` and `3–4×` boxes as-is — they sit beside/below this chart once the layout restructure from the S2 changes above is applied.

Replace this HTML:
```html
<div style="background:rgba(245,168,0,.07);border:1px solid rgba(245,168,0,.22);border-radius:9px;padding:14px 16px;">
  <div class="stat-12" style="font-family:'DM Serif Display',serif;font-size:clamp(28px,3.2vw,44px);color:var(--amber);line-height:1;">~12%</div>
  <div style="font-size:12px;color:rgba(255,255,255,.52);margin-top:4px;">Average AI utilization across offerings today</div>
</div>
```

With this:
```html
<div style="background:rgba(245,168,0,.07);border:1px solid rgba(245,168,0,.22);border-radius:9px;padding:14px 16px;">
  <div style="font-size:9.5px;font-weight:700;letter-spacing:.16em;color:var(--amber);margin-bottom:10px;">AI UTILIZATION TODAY</div>
  <canvas id="chart-utilization" height="72"></canvas>
  <div style="font-size:11px;color:rgba(255,255,255,.4);margin-top:8px;font-style:italic;">Average across all offerings — most competency areas below 20%</div>
</div>
```

Then initialize the chart in the JavaScript, inside the `goTo(1)` / slide 2 activation block (or in the global init if no per-slide init exists). Add this function and call it once:

```js
function initUtilizationChart() {
  var ctx = document.getElementById('chart-utilization');
  if (!ctx || ctx._chartInstance) return;
  ctx._chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Current Utilization', 'Untapped Potential'],
      datasets: [{
        data: [12, 88],
        backgroundColor: ['rgba(245,168,0,0.75)', 'rgba(255,255,255,0.06)'],
        borderColor: ['rgba(245,168,0,1)', 'rgba(255,255,255,0.1)'],
        borderWidth: 1,
        borderRadius: 4,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      animation: { duration: 900, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: function(c) { return c.raw + '%'; } }
        }
      },
      scales: {
        x: {
          max: 100,
          ticks: { callback: function(v) { return v + '%'; }, stepSize: 25 },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: { grid: { display: false } }
      }
    }
  });
}
```

Call `initUtilizationChart()` when slide 2 becomes active (inside the `goTo` function or the slide activation handler, triggered when `cur === 2`).

---

### CHART 2 — S6: Efficiency Targets (Radial Progress Arcs)

**Purpose:** The three 18-month efficiency targets (20–30% efficiency gains, 10% revenue/employee, 5pt margin) become animated radial arc gauges — the ShadCN "radial chart" aesthetic. Each metric card gets a small arc showing progress-toward-goal.

**Where to place it:** Replace the three existing metric boxes inside `#s6 .three` with enhanced versions that each contain a `<canvas>` arc chart above the label.

Replace the entire `<div class="three" style="gap:11px;">` block in `#s6` with:
```html
<div class="three" style="gap:11px;">
  <div class="metric-box" style="background:rgba(5,171,140,.08);border:1px solid rgba(5,171,140,.25);border-radius:10px;padding:16px 12px;text-align:center;">
    <canvas id="chart-efficiency" width="80" height="80" style="display:block;margin:0 auto 8px;"></canvas>
    <div class="mlbl">efficiency gains<br>Audit &amp; Assessment</div>
  </div>
  <div class="metric-box" style="background:rgba(5,171,140,.06);border:1px solid rgba(5,171,140,.2);border-radius:10px;padding:16px 12px;text-align:center;">
    <canvas id="chart-revenue-emp" width="80" height="80" style="display:block;margin:0 auto 8px;"></canvas>
    <div class="mlbl">revenue per<br>employee lift</div>
  </div>
  <div class="metric-box" style="background:rgba(5,171,140,.06);border:1px solid rgba(5,171,140,.2);border-radius:10px;padding:16px 12px;text-align:center;">
    <canvas id="chart-margin" width="80" height="80" style="display:block;margin:0 auto 8px;"></canvas>
    <div class="mlbl">margin expansion<br>from AI</div>
  </div>
</div>
```

Then add this initialization function in the JavaScript:
```js
function initRadialCharts() {
  var configs = [
    { id: 'chart-efficiency', value: 25, max: 100, label: '20–30%', color: 'rgba(5,171,140,' },
    { id: 'chart-revenue-emp', value: 10, max: 100, label: '10%',   color: 'rgba(5,171,140,' },
    { id: 'chart-margin',      value: 5,  max: 20,  label: '5pt',   color: 'rgba(5,171,140,' },
  ];
  configs.forEach(function(cfg) {
    var ctx = document.getElementById(cfg.id);
    if (!ctx || ctx._chartInstance) return;
    ctx._chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [cfg.value, cfg.max - cfg.value],
          backgroundColor: [cfg.color + '0.85)', cfg.color + '0.08)'],
          borderColor: [cfg.color + '1)', cfg.color + '0.12)'],
          borderWidth: 1.5,
          circumference: 270,
          rotation: -135,
        }]
      },
      options: {
        responsive: false,
        cutout: '72%',
        animation: { animateRotate: true, duration: 1000, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      },
      plugins: [{
        id: 'centerLabel',
        beforeDraw: function(chart) {
          var ctx2 = chart.ctx;
          var cx = chart.width / 2, cy = chart.height / 2;
          ctx2.save();
          ctx2.font = "700 14px 'DM Serif Display', serif";
          ctx2.fillStyle = 'rgba(5,171,140,1)';
          ctx2.textAlign = 'center';
          ctx2.textBaseline = 'middle';
          ctx2.fillText(cfg.label, cx, cy);
          ctx2.restore();
        }
      }]
    });
  });
}
```

Call `initRadialCharts()` when slide 6 becomes active (triggered when `cur === 6`).

---

### CHART 3 — S9: Before/After Coverage (Grouped Bar Chart)

**Purpose:** The Before/After table showing coverage (15–20% → 100%) and cadence (Quarterly → Weekly) is much more powerful as a visual comparison chart. Numbers in a table don't communicate the magnitude of the leap — a bar chart does.

**Where to place it:** Add a `<canvas>` chart **above** the Before/After table inside `#s9`. Insert it between the situation text (`.situation-text`) and the three pillar cards. This gives the chart its own row before the detail content.

Add this block after the `<div class="ani mt8">` situation text block and before the `<div class="ani mt14"` pillar cards div:
```html
<div class="ani mt12" style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:16px 20px;">
  <div style="font-size:9.5px;font-weight:700;letter-spacing:.16em;color:var(--mid);margin-bottom:12px;">THE BEFORE / AFTER — AT A GLANCE</div>
  <canvas id="chart-before-after" height="110"></canvas>
</div>
```

Then add this initialization:
```js
function initBeforeAfterChart() {
  var ctx = document.getElementById('chart-before-after');
  if (!ctx || ctx._chartInstance) return;
  ctx._chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Transaction Coverage', 'Alert Review Cycles / Quarter'],
      datasets: [
        {
          label: 'Before',
          data: [17.5, 1],
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderColor: 'rgba(255,255,255,0.2)',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'After (AI-enabled)',
          data: [100, 13],
          backgroundColor: 'rgba(5,171,140,0.6)',
          borderColor: 'rgba(5,171,140,0.9)',
          borderWidth: 1,
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: {
          display: true,
          labels: { color: 'rgba(255,255,255,0.55)', boxWidth: 12, padding: 16 }
        },
        tooltip: {
          callbacks: {
            label: function(c) {
              if (c.datasetIndex === 0 && c.dataIndex === 0) return 'Before: 15–20% sample';
              if (c.datasetIndex === 1 && c.dataIndex === 0) return 'After: 100% coverage';
              if (c.datasetIndex === 0 && c.dataIndex === 1) return 'Before: Quarterly';
              if (c.datasetIndex === 1 && c.dataIndex === 1) return 'After: Weekly (~13×/qtr)';
              return c.raw;
            }
          }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' } },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { callback: function(v) { return v + (v <= 20 ? '%' : ''); } }
        }
      }
    }
  });
}
```

Call `initBeforeAfterChart()` when slide 9 becomes active (triggered when `cur === 9`).

---

### CHART 4 — S12: 18-Month Goals Dashboard (Progress Bars)

**Purpose:** The 6 goal metrics become a proper dashboard — each goal rendered as a labeled progress bar with the target value displayed, styled to look like a ShadCN metrics dashboard. This is the most impactful chart in the deck because it is the "scorecard" slide.

**Where to place it:** Replace the entire `.goal-grid` div inside `#s12 .f-content` with the following structure. The existing 6 `.goal-item` divs are removed and replaced with canvas-based progress bars.

Replace:
```html
<div class="goal-grid ani mt20" style="flex:1;align-content:start;">
  ... [all 6 goal-item divs] ...
</div>
```

With:
```html
<div class="ani mt20" style="flex:1;display:flex;flex-direction:column;gap:18px;">
  <canvas id="chart-goals" style="width:100%;max-height:340px;"></canvas>
</div>
```

Then add this initialization:
```js
function initGoalsChart() {
  var ctx = document.getElementById('chart-goals');
  if (!ctx || ctx._chartInstance) return;
  ctx._chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Revenue from AI-enabled offerings',
        'Increase in revenue per employee',
        'Margin expansion from AI',
        'Proposals referencing AI',
        'Engagements on outcome-based pricing',
        'Competency Centers with AI Champions'
      ],
      datasets: [{
        label: '18-Month Target',
        data: [30, 10, 5, 70, 30, 100],
        backgroundColor: [
          'rgba(245,168,0,0.7)',
          'rgba(245,168,0,0.6)',
          'rgba(5,171,140,0.65)',
          'rgba(245,168,0,0.7)',
          'rgba(5,171,140,0.65)',
          'rgba(84,192,232,0.65)',
        ],
        borderColor: [
          'rgba(245,168,0,1)',
          'rgba(245,168,0,0.9)',
          'rgba(5,171,140,0.9)',
          'rgba(245,168,0,1)',
          'rgba(5,171,140,0.9)',
          'rgba(84,192,232,0.9)',
        ],
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      animation: { duration: 1000, easing: 'easeOutQuart', delay: function(ctx2) { return ctx2.dataIndex * 80; } },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(c) {
              var suffixes = ['%', '%', 'pt', '%', '%', '%'];
              return 'Target: ' + c.raw + (suffixes[c.dataIndex] || '');
            }
          }
        }
      },
      scales: {
        x: {
          max: 100,
          ticks: { callback: function(v) { return v + '%'; }, stepSize: 25 },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          grid: { display: false },
          ticks: { color: 'rgba(255,255,255,0.72)', font: { size: 12 } }
        }
      }
    },
    plugins: [{
      id: 'valueLabels',
      afterDatasetsDraw: function(chart) {
        var ctx2 = chart.ctx;
        var suffixes = ['%', '%', 'pt', '%', '%', '%'];
        chart.data.datasets[0].data.forEach(function(val, i) {
          var meta = chart.getDatasetMeta(0);
          var bar = meta.data[i];
          ctx2.save();
          ctx2.font = "700 12px 'DM Sans', Arial, sans-serif";
          ctx2.fillStyle = 'rgba(255,255,255,0.85)';
          ctx2.textAlign = 'left';
          ctx2.textBaseline = 'middle';
          ctx2.fillText(val + (suffixes[i] || ''), bar.x + 6, bar.y);
          ctx2.restore();
        });
      }
    }]
  });
}
```

Call `initGoalsChart()` when slide 12 becomes active (triggered when `cur === 12`).

---

### S4 — Sell AI P1: Pipeline Flow Infographic (SVG Enhancement)

**Purpose:** The existing Assessment → Implementation → Managed Service SVG pipeline is already in the slide but is very minimal. Enhance it to look like a proper funnel/pipeline infographic with revenue implications labeled at each stage.

The existing SVG in `#s4` with `class="pipeline-svg"` should be replaced with an enhanced version:
```html
<svg class="pipeline-svg" viewBox="0 0 520 72" style="width:100%;height:72px;overflow:visible;margin-top:18px;">
  <!-- Track line -->
  <line x1="60" y1="24" x2="460" y2="24" stroke="rgba(245,168,0,0.12)" stroke-width="2"/>
  <!-- Animated fill line -->
  <line class="pipe-line" x1="60" y1="24" x2="460" y2="24"
        stroke="rgba(245,168,0,0.6)" stroke-width="2" opacity="0"
        stroke-dasharray="400" stroke-dashoffset="400"/>
  <!-- Stage nodes -->
  <circle cx="60"  cy="24" r="7" fill="rgba(245,168,0,0.15)" stroke="#F5A800" stroke-width="1.5"/>
  <circle cx="260" cy="24" r="7" fill="rgba(245,168,0,0.12)" stroke="rgba(245,168,0,0.6)" stroke-width="1.5"/>
  <circle cx="460" cy="24" r="7" fill="rgba(245,168,0,0.10)" stroke="rgba(245,168,0,0.45)" stroke-width="1.5"/>
  <!-- Stage labels -->
  <text x="60"  y="48" text-anchor="middle" fill="#F5A800"              font-size="12" font-family="DM Sans,Arial,sans-serif" font-weight="700">Assessment</text>
  <text x="260" y="48" text-anchor="middle" fill="rgba(245,168,0,0.8)"  font-size="12" font-family="DM Sans,Arial,sans-serif" font-weight="700">Implementation</text>
  <text x="460" y="48" text-anchor="middle" fill="rgba(245,168,0,0.65)" font-size="12" font-family="DM Sans,Arial,sans-serif" font-weight="700">Managed Service</text>
  <!-- Sub-labels -->
  <text x="60"  y="64" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="10" font-family="DM Sans,Arial,sans-serif">Diagnose</text>
  <text x="260" y="64" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="10" font-family="DM Sans,Arial,sans-serif">Build &amp; Deploy</text>
  <text x="460" y="64" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="10" font-family="DM Sans,Arial,sans-serif">Recurring Revenue</text>
  <!-- Arrows -->
  <text x="160" y="28" text-anchor="middle" fill="rgba(245,168,0,0.4)" font-size="14">›</text>
  <text x="360" y="28" text-anchor="middle" fill="rgba(245,168,0,0.4)" font-size="14">›</text>
</svg>
```

---

### Triggering Charts on Slide Activation

The chart init functions must be called **only when their slide becomes active** — calling them before the canvas is visible will produce incorrect sizing. Find the `goTo(n)` function in the JavaScript (or whatever function handles slide transitions) and add the chart init calls:

```js
// Inside the goTo function, after the slide class changes are applied:
function goTo(n) {
  // ... existing slide transition code ...

  // Chart inits — only fire once per session (guarded by _chartInstance check)
  if (n === 2)  initUtilizationChart();
  if (n === 6)  initRadialCharts();
  if (n === 9)  initBeforeAfterChart();
  if (n === 12) initGoalsChart();
}
```

If the presentation uses a different navigation pattern (e.g., keyboard events or button click handlers), locate where `cur` is updated and add the same calls there.

---

## EXECUTION ORDER

1. Make all **global CSS changes** first (font sizes, animation slowdowns)
2. Add **Chart.js CDN script** and global Chart.js defaults to `<head>` and top of `<script>`
3. Fix the **two broken local image paths** (S5, S8) — these will show blank panels until fixed
4. Work through slides **S2, S3, S9, S12** (most structural changes + charts for S2, S9, S12)
5. Work through slides **S1, S4, S5, S6, S7** (image replacements + minor layout + charts for S4, S6)
6. Work through slides **S8, S10, S11, S13** (smaller tweaks)
7. Final pass: verify all `.ani` entrance animations fire correctly on every slide, and all charts render when navigating to their respective slides
