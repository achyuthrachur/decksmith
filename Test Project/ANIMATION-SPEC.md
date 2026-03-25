# Animation Upgrade Spec — v3 (Merged)
## Crowe Consulting AI Strategy Presentation
> For Claude Code to execute.
> Source file: `Crowe-AI-Strategy-Presentation.html`
> Output: fully animated, standalone HTML (images + JS baked in)
> Sources: magicui.design (verified live) + 21st.dev (install commands from user-supplied map)

---

## Architecture Decision

Standalone HTML file — NOT a React app. Approach:
1. Scaffold a **Vite + React + TypeScript** project to install and extract component source
2. Use `npx shadcn@latest add` to pull components into `src/components/ui/`
3. **Port each component's core animation logic to vanilla JS/GSAP** — strip React/JSX, keep the math and motion
4. GSAP + Motion load via CDN in the final HTML
5. Run `bake-images.cjs` to inline all images as base64

Final output: a single `.html` file with zero external dependencies.

---

## Full Install Block

```bash
# Core animation engine
npm install gsap
npm install motion

# ── MAGICUI (verified from magicui.design) ──────────────────────────
npx shadcn@latest init   # choose Vite/React if not already done

npx shadcn@latest add @magicui/blur-fade          # blur-to-focus entrance — every slide
npx shadcn@latest add @magicui/text-animate       # word/char stagger — S1, S8, S11
npx shadcn@latest add @magicui/number-ticker      # count-up numbers — S2, S5, S10
npx shadcn@latest add @magicui/magic-card         # cursor spotlight on cards — all slides
npx shadcn@latest add @magicui/particles          # ambient particle field — S1, S11
npx shadcn@latest add @magicui/animated-beam      # SVG beam for pipeline — S4
npx shadcn@latest add @magicui/border-beam        # orbiting border glow — S10, S11
npx shadcn@latest add @magicui/shine-border       # single shine sweep — S3

# ── 21ST.DEV (install commands from user-supplied map) ───────────────
npx shadcn@latest add https://21st.dev/r/aceternity/card-spotlight     # dramatic cursor spotlight — S3, S4, S10
npx shadcn@latest add https://21st.dev/r/aceternity/aurora-background  # animated gradient wash — S3 bg
npx shadcn@latest add https://21st.dev/r/aceternity/shooting-stars     # streaking lines — S11 bg
npx shadcn@latest add https://21st.dev/r/ibelick/text-morph            # text morphs between phrases — S6 Step 2
npx shadcn@latest add https://21st.dev/r/barvian/number-flow-transitions  # slot-machine number — S10 "All"
npx shadcn@latest add https://21st.dev/r/dillionverma/animated-gradient-text  # flowing gradient text — S1, S11
npx shadcn@latest add https://21st.dev/r/designali-in/gradient-text    # static gradient on words — S1, S3
npx shadcn@latest add https://21st.dev/r/anurag-mishra22/animated-glitch-text  # glitch effect — S1
npx shadcn@latest add https://21st.dev/r/preetsuthar17/typewriter-text  # typewriter reveal — S1 tagline
npx shadcn@latest add https://21st.dev/r/dillionverma/neon-gradient-card  # neon glow card — S5, S10
npx shadcn@latest add https://21st.dev/r/dillionverma/word-pull-up     # words rise staggered — S4, S8, S11
npx shadcn@latest add https://21st.dev/r/dillionverma/number-ticker    # 21st variant (alternative to magicui)
# Tilt card — install command not verified; open 21st.dev and copy from the component page
# Animated Grid Pattern — install command not verified; open 21st.dev and copy from the component page
```

---

## CDN Tags for Standalone HTML

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/motion@11.11.17/dist/motion.js"></script>
```

---

## Component Reference

### Redundancy resolution

| Effect | Winner | Reason |
|---|---|---|
| Blur-to-focus entrance | **magicui BlurFade** | Full vanilla port written; verified props |
| Word/char text stagger | **magicui TextAnimate** | More animation modes; verified |
| Count-up numbers | **magicui NumberTicker** | Verified props + working GSAP port |
| Cursor spotlight on cards | **Both** — use 21st CardSpotlight for S3 pillars (more dramatic), magicui MagicCard for all others | Different intensities for different contexts |
| Ambient particles | **magicui Particles** | Full canvas port written |
| SVG beam / pipeline draw | **magicui AnimatedBeam** (ported) | Works without React refs |
| Orbiting border glow | **magicui BorderBeam** | Working CSS port |
| Shine sweep | **magicui ShineBorder** | Working CSS port |
| Word pull-up | **21st WordPullUp** | Distinct from blurFadeIn — spring physics feel |
| Text morph (S6) | **21st TextMorph** | Strictly better than strikethrough for Step 2 flip |
| Slot machine number | **21st NumberFlow** | More polished than manual setInterval |
| Gradient text accent | **21st GradientText / AnimatedGradientText** | No magicui equivalent |
| Glitch text | **21st GlitchText** | No magicui equivalent |
| Typewriter | **21st TypewriterText** | No magicui equivalent |
| 3D tilt card | **21st Tilt** | No magicui equivalent |
| Neon glow card | **21st NeonGradientCard** | More dramatic than ShineBorder |
| Aurora background | **21st AuroraBackground** | No magicui equivalent |
| Animated grid | **21st AnimatedGridPattern** | No magicui equivalent |
| Shooting stars | **21st ShootingStars** | No magicui equivalent |

---

## Component Details & Vanilla JS Ports

---

### 1. BlurFade — `@magicui/blur-fade`
**Source:** magicui.design | **Used on:** Every slide — headline/eyebrow/body entrances

```tsx
// React usage
import { BlurFade } from "@/components/ui/blur-fade"
<BlurFade delay={0.25} inView direction="down" blur="6px">
  <h2>Hello World</h2>
</BlurFade>
```

**Props:** `delay`, `duration` (0.4), `direction` (down/up/left/right), `inView`, `blur` ("6px"), `offset` (6)

```js
// Vanilla JS port
function blurFadeIn(selector, options = {}) {
  const { delay = 0, duration = 0.45, direction = 'down', blur = '8px', stagger = 0, y = 14, x = 0 } = options;
  const fromY = direction === 'down' ? -y : direction === 'up' ? y : 0;
  const fromX = direction === 'left' ? x : direction === 'right' ? -x : 0;
  gsap.fromTo(selector,
    { opacity: 0, filter: `blur(${blur})`, y: fromY, x: fromX },
    { opacity: 1, filter: 'blur(0px)', y: 0, x: 0, duration, delay, stagger, ease: 'power3.out', clearProps: 'filter' }
  );
}
```

---

### 2. TextAnimate — `@magicui/text-animate`
**Source:** magicui.design | **Used on:** S1 h1, S8 h2, S11 h2

Supports: `blurInUp`, `blurIn`, `slideUp`, `slideLeft`, `fadeIn`, `scaleUp` — by `word`, `character`, `line`

```tsx
<TextAnimate animation="blurInUp" by="word" once>Crowe Consulting AI Strategy</TextAnimate>
```

```js
// Vanilla JS port
function textAnimate(selector, options = {}) {
  const { by = 'word', animation = 'blurInUp', delay = 0, staggerDelay = 0.08, duration = 0.5 } = options;
  const el = document.querySelector(selector);
  if (!el) return;
  const units = by === 'word' ? el.textContent.split(' ') : el.textContent.split('');
  el.innerHTML = units.map(u => `<span class="text-unit" style="display:inline-block;white-space:pre;">${u}${by === 'word' ? ' ' : ''}</span>`).join('');
  const spans = el.querySelectorAll('.text-unit');
  if (animation === 'blurInUp') {
    gsap.fromTo(spans, { opacity:0, filter:'blur(10px)', y:20 }, { opacity:1, filter:'blur(0px)', y:0, duration, delay, stagger:staggerDelay, ease:'power3.out', clearProps:'filter' });
  } else if (animation === 'slideUp') {
    gsap.fromTo(spans, { opacity:0, y:24 }, { opacity:1, y:0, duration, delay, stagger:staggerDelay, ease:'power2.out' });
  } else if (animation === 'fadeIn') {
    gsap.fromTo(spans, { opacity:0 }, { opacity:1, duration, delay, stagger:staggerDelay, ease:'power1.out' });
  }
}
```

---

### 3. GlitchText — `https://21st.dev/r/anurag-mishra22/animated-glitch-text`
**Source:** 21st.dev | **Used on:** S1 — "AI Strategy" accent only

```tsx
import { GlitchText } from "@/components/ui/animated-glitch-text"
<GlitchText text="AI Strategy" textClassName="text-7xl font-black" />
```

```js
// Vanilla JS port — CSS-based glitch using data attributes
function initGlitch(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const text = el.textContent;
    el.setAttribute('data-text', text);
    el.classList.add('glitch-text');
  });
}
// CSS to add:
// .glitch-text { position:relative; }
// .glitch-text::before, .glitch-text::after {
//   content: attr(data-text); position:absolute; top:0; left:0; width:100%;
// }
// .glitch-text::before { animation: glitch1 3s infinite; clip-path: polygon(0 30%,100% 30%,100% 55%,0 55%); color: var(--cyan); left: 2px; }
// .glitch-text::after  { animation: glitch2 3s infinite; clip-path: polygon(0 60%,100% 60%,100% 80%,0 80%); color: var(--amber); left: -2px; }
// @keyframes glitch1 { 0%,90%,100%{opacity:0} 92%,96%{opacity:1; transform:translate(-2px,1px)} 94%,98%{opacity:1; transform:translate(2px,-1px)} }
// @keyframes glitch2 { 0%,88%,100%{opacity:0} 90%,94%{opacity:1; transform:translate(2px,1px)} 92%,96%{opacity:1; transform:translate(-2px,-1px)} }
```

> **Note:** Use sparingly — S1 title only, on the words "AI Strategy". Glitch is seasoning, not soup.

---

### 4. TypewriterText — `https://21st.dev/r/preetsuthar17/typewriter-text`
**Source:** 21st.dev | **Used on:** S1 tagline "Simple. Focused. Built to win."

```tsx
import { Typewriter } from "@/components/ui/typewriter-text"
<Typewriter text={["Simple.", "Focused.", "Built to win."]} speed={80} loop className="text-2xl font-medium" />
```

```js
// Vanilla JS port
function typewriter(selector, texts, options = {}) {
  const { speed = 70, deleteSpeed = 40, pauseMs = 1500, loop = false } = options;
  const el = document.querySelector(selector);
  if (!el) return;
  let tIdx = 0, cIdx = 0, deleting = false;
  function tick() {
    const current = texts[tIdx];
    el.textContent = deleting ? current.slice(0, cIdx--) : current.slice(0, cIdx++);
    if (!deleting && cIdx > current.length) {
      if (!loop && tIdx === texts.length - 1) return;
      setTimeout(() => { deleting = true; tick(); }, pauseMs);
      return;
    }
    if (deleting && cIdx < 0) {
      deleting = false; cIdx = 0;
      tIdx = (tIdx + 1) % texts.length;
    }
    setTimeout(tick, deleting ? deleteSpeed : speed);
  }
  tick();
}
// Usage: typewriter('#s1 .title-tagline', ['Simple. Focused. Built to win.'], { speed: 65, loop: false });
```

---

### 5. AnimatedGradientText / GradientText
**Source:** 21st.dev
- `https://21st.dev/r/dillionverma/animated-gradient-text` — flowing gradient animates through text
- `https://21st.dev/r/designali-in/gradient-text` — static gradient on words

**Used on:** S1 "AI Strategy" amber shimmer, S3 section headings, S11 closing emphasis

```tsx
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
<AnimatedGradientText>
  <span className="inline animate-gradient bg-gradient-to-r from-[#F5A800] via-[#FFD231] to-[#F5A800] bg-[length:200%_100%] bg-clip-text text-transparent">
    AI Strategy
  </span>
</AnimatedGradientText>
```

```css
/* CSS port — add to <style> block */
@keyframes gradientFlow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.gradient-text {
  background: linear-gradient(90deg, #F5A800, #FFD231, #D7761D, #F5A800);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientFlow 3s linear infinite;
}
```

---

### 6. WordPullUp — `https://21st.dev/r/dillionverma/word-pull-up`
**Source:** 21st.dev | **Used on:** S4 pipeline supporting sentence, S8 subtext, S11 supporting statement

Spring-physics word rise — more organic feel than blurFadeIn's blur approach.

```tsx
import { WordPullUp } from "@/components/ui/word-pull-up"
<WordPullUp words="From assessment to implementation to managed service" className="text-xl" />
```

```js
// Vanilla JS port using GSAP spring-like easing
function wordPullUp(selector, options = {}) {
  const { delay = 0, stagger = 0.07 } = options;
  const el = document.querySelector(selector);
  if (!el) return;
  const words = el.textContent.split(' ');
  el.innerHTML = words.map(w => `<span class="pull-word" style="display:inline-block;">${w}&nbsp;</span>`).join('');
  gsap.fromTo(el.querySelectorAll('.pull-word'),
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, stagger, duration: 0.55, delay, ease: 'back.out(1.7)' }
  );
}
```

---

### 7. NumberTicker — `@magicui/number-ticker`
**Source:** magicui.design (also available: `https://21st.dev/r/dillionverma/number-ticker`)
**Used on:** S2 stats, S5 metrics, S10 goals

```tsx
<NumberTicker value={30} delay={0.5} className="text-6xl font-bold text-white" />
```

**Props:** `value`, `startValue` (0), `direction` ("up"), `delay` (0), `decimalPlaces` (0)

```js
function numberTicker(selector, options = {}) {
  const { from = 0, to, prefix = '', suffix = '', duration = 1.2, delay = 0 } = options;
  const el = document.querySelector(selector);
  if (!el) return;
  const obj = { val: from };
  gsap.to(obj, {
    val: to, duration, delay, ease: 'power2.out',
    onUpdate: () => { el.textContent = prefix + Math.round(obj.val) + suffix; },
    onComplete: () => { el.textContent = prefix + to + suffix; }
  });
}

function countUpRange(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const obj = { val: 0 };
  gsap.to(obj, { val: 20, duration: 1.0, ease: 'power2.out',
    onUpdate: () => el.textContent = Math.round(obj.val) + '%',
    onComplete: () => gsap.to({}, { duration: 0.2, onComplete: () => { el.textContent = '20–30%'; }})
  });
}
```

---

### 8. NumberFlow — `https://21st.dev/r/barvian/number-flow-transitions`
**Source:** 21st.dev | **Used on:** S10 "All" stat — slot-machine digit spin before landing

```tsx
import NumberFlow from "@number-flow/react"
<NumberFlow value={100} trend="increasing" />
```

```js
// Vanilla JS slot-machine port
function slotMachineReveal(selector, finalValue, duration = 800) {
  const el = document.querySelector(selector);
  if (!el) return;
  const frames = ['12', '7', '23', '5', '18', '9', '31', '4', finalValue];
  let i = 0;
  const interval = setInterval(() => {
    el.textContent = frames[i % frames.length];
    i++;
    if (i >= frames.length) { clearInterval(interval); el.textContent = finalValue; }
  }, duration / frames.length);
}
```

---

### 9. TextMorph — `https://21st.dev/r/ibelick/text-morph`
**Source:** 21st.dev | **Used on:** S6 Step 2 — old question morphs into new question

This replaces the GSAP strikethrough approach. TextMorph is more cinematic.

```tsx
import { TextMorph } from "@/components/ui/text-morph"
<TextMorph className="text-lg font-semibold">
  {isOld ? "How can we use AI in this offering?" : "Where in our client's value chain can AI materially improve outcomes?"}
</TextMorph>
```

```js
// Vanilla JS port using cross-fade + blur morph
function morphText(oldEl, newEl, duration = 600) {
  gsap.to(oldEl, { opacity: 0, filter: 'blur(8px)', y: -8, duration: duration/1000 * 0.6, ease: 'power2.in' });
  setTimeout(() => {
    oldEl.style.display = 'none';
    newEl.style.display = 'block';
    gsap.fromTo(newEl,
      { opacity: 0, filter: 'blur(8px)', y: 8 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: duration/1000 * 0.7, ease: 'power2.out', clearProps: 'filter' }
    );
  }, duration * 0.55);
}
// Usage in animateStep2:
// morphText(row.querySelector('.step-old'), row.querySelector('.step-new'), 700);
```

---

### 10. MagicCard — `@magicui/magic-card`
**Source:** magicui.design | **Used on:** All neutral/teal/cyan cards across all slides

Cursor-tracking radial gradient. Use for cards that don't need the full CardSpotlight drama.

```tsx
<MagicCard gradientColor="rgba(245,168,0,0.12)">content</MagicCard>
```

```js
function initMagicCards() {
  const colors = { 'card-a':'rgba(245,168,0,0.12)', 'card-t':'rgba(5,171,140,0.11)', 'card-c':'rgba(84,192,232,0.10)', 'card':'rgba(255,255,255,0.06)' };
  document.querySelectorAll('.card, .card-a, .card-t, .card-c, .goal-item, .step').forEach(card => {
    let spotColor = colors['card'];
    if (card.classList.contains('card-a')) spotColor = colors['card-a'];
    else if (card.classList.contains('card-t')) spotColor = colors['card-t'];
    else if (card.classList.contains('card-c')) spotColor = colors['card-c'];
    const origBg = card.style.background || '';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.background = `radial-gradient(400px circle at ${e.clientX-r.left}px ${e.clientY-r.top}px, ${spotColor}, transparent 60%), ${origBg || 'rgba(255,255,255,0.045)'}`;
    });
    card.addEventListener('mouseleave', () => { card.style.background = origBg; });
  });
}
```

---

### 11. CardSpotlight — `https://21st.dev/r/aceternity/card-spotlight`
**Source:** 21st.dev | **Used on:** S3 pillar cards (more dramatic than MagicCard)

```tsx
import { CardSpotlight } from "@/components/ui/card-spotlight"
<CardSpotlight className="rounded-2xl p-6">
  <h3 className="relative z-20 text-xl font-semibold text-white">Sell AI</h3>
</CardSpotlight>
```

```js
// Vanilla JS port — brighter, larger spotlight than MagicCard
function initCardSpotlight(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(245,168,0,0.16), rgba(255,255,255,0.03) 40%, transparent 70%)`;
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });
}
// Apply to S3 pillar cards only:
// initCardSpotlight('#s3 .card');
```

---

### 12. NeonGradientCard — `https://21st.dev/r/dillionverma/neon-gradient-card`
**Source:** 21st.dev | **Used on:** S5 featured KPI tile, S10 "All" goal item

Pulsing neon glow border — more dramatic than BorderBeam for single hero tiles.

```tsx
import { NeonGradientCard } from "@/components/ui/neon-gradient-card"
<NeonGradientCard className="rounded-2xl p-6">
  <div className="text-4xl font-bold">5 pts</div>
  <div className="text-sm text-zinc-400">Margin expansion</div>
</NeonGradientCard>
```

```css
/* Vanilla CSS port */
@keyframes neonPulse {
  0%,100% { box-shadow: 0 0 8px rgba(245,168,0,0.4), 0 0 20px rgba(245,168,0,0.2), inset 0 0 8px rgba(245,168,0,0.05); }
  50%      { box-shadow: 0 0 16px rgba(245,168,0,0.7), 0 0 40px rgba(245,168,0,0.35), inset 0 0 14px rgba(245,168,0,0.1); }
}
.neon-card { animation: neonPulse 2.5s ease-in-out infinite; }
```

```js
function addNeonCard(selector) {
  document.querySelectorAll(selector).forEach(el => el.classList.add('neon-card'));
}
// addNeonCard('#s10 .goal-item.hi');
// addNeonCard('#s5 .metric-box:first-child');
```

---

### 13. Tilt — 21st.dev
**Source:** 21st.dev | **Install:** not verified — open 21st.dev and copy from component page
**Used on:** S10 goal items — 3D perspective tilt toward cursor

```tsx
import { Tilt } from "@/components/ui/tilt"
<Tilt rotationFactor={8} isRevese>
  <div className="rounded-2xl border p-6">Goal item</div>
</Tilt>
```

```js
// Vanilla JS 3D tilt port
function initTiltCards(selector, factor = 8) {
  document.querySelectorAll(selector).forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.15s ease-out';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const rx = ((e.clientY - cy) / (r.height / 2)) * -factor;
      const ry = ((e.clientX - cx) / (r.width / 2)) * factor;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}
// Apply to S10 goal items:
// initTiltCards('#s10 .goal-item', 6);
```

> Keep tilt subtle (factor 4–8). Too much and the deck becomes a carnival.

---

### 14. Particles — `@magicui/particles`
**Source:** magicui.design (also: `https://21st.dev/r/dillionverma/particles`)
**Used on:** S1, S11 backgrounds

```tsx
<Particles className="absolute inset-0" quantity={60} ease={80} color="#F5A800" size={0.5} />
```

```js
function initParticles(canvasId, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const { quantity=60, color='#F5A800', size=0.5, ease=80, staticity=40 } = options;
  const toRgb = hex => ({ r:parseInt(hex.slice(1,3),16), g:parseInt(hex.slice(3,5),16), b:parseInt(hex.slice(5,7),16) });
  const rgb = toRgb(color);
  canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
  let mouse = { x: canvas.width/2, y: canvas.height/2 };
  const pts = Array.from({length:quantity}, () => ({
    x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    tx:Math.random()*canvas.width, ty:Math.random()*canvas.height,
    sz:Math.random()*size*2+0.3, a:Math.random()*0.35+0.05,
    vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3
  }));
  canvas.addEventListener('mousemove', e => { const r=canvas.getBoundingClientRect(); mouse={x:e.clientX-r.left,y:e.clientY-r.top}; });
  (function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(p => {
      const dx=mouse.x-p.x, dy=mouse.y-p.y, dist=Math.sqrt(dx*dx+dy*dy)||1;
      const force=Math.max(0,(200-dist)/200);
      p.tx += p.vx + (dx/dist)*force*(100-ease)*.001;
      p.ty += p.vy + (dy/dist)*force*(100-ease)*.001;
      p.x += (p.tx-p.x)*(100-staticity)*.001+p.vx;
      p.y += (p.ty-p.y)*(100-staticity)*.001+p.vy;
      if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
      if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.sz,0,Math.PI*2);
      ctx.fillStyle=`rgba(${rgb.r},${rgb.g},${rgb.b},${p.a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}
```

---

### 15. AuroraBackground — `https://21st.dev/r/aceternity/aurora-background`
**Source:** 21st.dev | **Used on:** S3 full-bleed background (behind pillar cards)

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background"
<AuroraBackground><div className="relative z-10">content</div></AuroraBackground>
```

```css
/* CSS port — aurora as absolute background layer */
@keyframes aurora {
  from { background-position: 50% 50%, 50% 50%; }
  to   { background-position: 350% 50%, 350% 50%; }
}
.aurora-bg {
  position: absolute; inset: 0; z-index: 0;
  background:
    repeating-linear-gradient(100deg, rgba(1,30,65,0) 0%, rgba(1,30,65,0) 7%, rgba(245,168,0,0.04) 10%, rgba(5,171,140,0.03) 12%, rgba(84,192,232,0.03) 16%),
    repeating-linear-gradient(100deg, rgba(1,30,65,0) 0%, rgba(245,168,0,0.03) 15%, rgba(5,171,140,0.02) 20%);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  animation: aurora 25s linear infinite;
  filter: blur(10px) saturate(150%);
  opacity: 0.7;
}
```

> Add `<div class="aurora-bg"></div>` as first child inside S3's `.bg-ov` layer.

---

### 16. AnimatedGridPattern — 21st.dev
**Source:** 21st.dev | **Install:** not verified — open 21st.dev and copy from component page
**Used on:** S2, S5, S9 subtle background texture

```tsx
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
<AnimatedGridPattern className="absolute inset-0 opacity-20" />
```

```css
/* CSS port — animated grid that pulses its opacity */
@keyframes gridPulse {
  0%,100% { opacity: 0.025; }
  50%      { opacity: 0.055; }
}
.animated-grid {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background-image:
    linear-gradient(rgba(245,168,0,1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,168,0,1) 1px, transparent 1px);
  background-size: 80px 80px;
  animation: gridPulse 4s ease-in-out infinite;
}
```

> Add `<div class="animated-grid"></div>` inside S2, S5, S9 as a background layer.

---

### 17. ShootingStars — `https://21st.dev/r/aceternity/shooting-stars`
**Source:** 21st.dev | **Used on:** S11 closing background only

```tsx
import { ShootingStars } from "@/components/ui/shooting-stars"
<ShootingStars minSpeed={15} maxSpeed={35} minDelay={1000} maxDelay={3000} />
```

```js
// Vanilla JS port — canvas-based shooting stars
function initShootingStars(canvasId, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const { minSpeed=12, maxSpeed=28, minDelay=800, maxDelay=2500, color='#F5A800' } = options;
  canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
  const stars = [];

  function spawnStar() {
    const angle = (Math.random() * 30 + 15) * Math.PI / 180;
    const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: 80 + Math.random() * 120,
      alpha: 1,
      width: 1 + Math.random()
    });
    setTimeout(spawnStar, minDelay + Math.random() * (maxDelay - minDelay));
  }
  spawnStar();

  (function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = stars.length-1; i >= 0; i--) {
      const s = stars[i];
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 0.4, s.y - s.vy * 0.4);
      grad.addColorStop(0, `rgba(245,168,0,${s.alpha})`);
      grad.addColorStop(1, 'rgba(245,168,0,0)');
      ctx.beginPath(); ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * 0.4, s.y - s.vy * 0.4);
      ctx.strokeStyle = grad; ctx.lineWidth = s.width; ctx.stroke();
      s.x += s.vx * 0.016; s.y += s.vy * 0.016;
      s.alpha -= 0.008;
      if (s.alpha <= 0 || s.x > canvas.width || s.y > canvas.height) stars.splice(i, 1);
    }
    requestAnimationFrame(draw);
  })();
}
// Add: <canvas id="s11-stars" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;"></canvas>
// initShootingStars('s11-stars');
```

---

### 18. AnimatedBeam — `@magicui/animated-beam` (SVG port)
**Source:** magicui.design | **Used on:** S4 Assessment → Implementation → Managed Service pipeline

```js
function animatePipeline() {
  const svg = document.querySelector('#s4 .pipeline-svg');
  if (!svg) return;
  const line = svg.querySelector('.pipe-line');
  gsap.set(line, { strokeDasharray: 280, strokeDashoffset: 280, opacity: 1 });
  gsap.to(line, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', delay: 0.6 });
  const nodes = svg.querySelectorAll('.pipe-node');
  [0.6, 0.98, 1.36].forEach((d, i) => {
    gsap.to(nodes[i], { opacity:1, scale:1.4, duration:0.2, ease:'back.out(3)', delay:d, transformOrigin:'center' });
    gsap.to(nodes[i], { scale:1, duration:0.15, delay:d+0.2 });
  });
  gsap.fromTo(svg.querySelectorAll('.pipe-label'), { opacity:0, y:4 }, { opacity:1, y:0, stagger:0.23, duration:0.25, ease:'power1.out', delay:0.85 });
  gsap.to(line, { filter:'drop-shadow(0 0 4px rgba(245,168,0,0.8))', duration:1.2, repeat:-1, yoyo:true, ease:'sine.inOut', delay:1.8 });
}
```

**SVG markup for S4:**
```html
<svg class="pipeline-svg" viewBox="0 0 420 56" style="width:100%;height:56px;overflow:visible;margin-top:14px;">
  <line x1="70" y1="20" x2="350" y2="20" stroke="rgba(245,168,0,0.15)" stroke-width="1.5"/>
  <line class="pipe-line" x1="70" y1="20" x2="350" y2="20" stroke="#F5A800" stroke-width="1.5" opacity="0" stroke-dasharray="280" stroke-dashoffset="280"/>
  <circle class="pipe-node" cx="70"  cy="20" r="5" fill="#F5A800" opacity="0"/>
  <circle class="pipe-node" cx="210" cy="20" r="5" fill="#F5A800" opacity="0"/>
  <circle class="pipe-node" cx="350" cy="20" r="5" fill="#F5A800" opacity="0"/>
  <text class="pipe-label" x="70"  y="42" text-anchor="middle" fill="#F5A800" font-size="11" font-family="DM Sans,Arial,sans-serif" font-weight="700" opacity="0">Assessment</text>
  <text class="pipe-label" x="210" y="42" text-anchor="middle" fill="#F5A800" font-size="11" font-family="DM Sans,Arial,sans-serif" font-weight="700" opacity="0">Implementation</text>
  <text class="pipe-label" x="350" y="42" text-anchor="middle" fill="#F5A800" font-size="11" font-family="DM Sans,Arial,sans-serif" font-weight="700" opacity="0">Managed Service</text>
</svg>
```

---

### 19. BorderBeam — `@magicui/border-beam`
**Source:** magicui.design (also: `https://21st.dev/r/badtzx0/border-beam`)
**Used on:** S10 "All" goal item, S11 closing quote

```css
@property --beam-pos { syntax:'<angle>'; inherits:false; initial-value:0deg; }
@keyframes borderBeam { from{--beam-pos:0deg} to{--beam-pos:360deg} }
.border-beam { position:relative; overflow:hidden; }
.border-beam::after {
  content:''; position:absolute; inset:0; border-radius:inherit; padding:1.5px;
  background:conic-gradient(from var(--beam-pos,0deg),transparent 0deg,#F5A800 30deg,#FFD231 60deg,transparent 90deg,transparent 360deg);
  -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude;
  animation:borderBeam 6s linear infinite; animation-delay:var(--beam-delay,0s); pointer-events:none;
}
```

```js
function addBorderBeam(selector, delay = 0) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('border-beam');
    el.style.setProperty('--beam-delay', `${delay + i * 0.3}s`);
  });
}
```

---

### 20. ShineBorder — `@magicui/shine-border`
**Source:** magicui.design | **Used on:** S3 pillar cards

```css
@keyframes shineSweep { 0%{transform:translateX(-100%) rotate(45deg)} 100%{transform:translateX(300%) rotate(45deg)} }
.shine-border { position:relative; overflow:hidden; }
.shine-border::before {
  content:''; position:absolute; top:-50%; left:-50%; width:30%; height:200%;
  background:linear-gradient(to right,transparent 0%,rgba(245,168,0,0.08) 50%,transparent 100%);
  animation:shineSweep 3s ease-in-out infinite; animation-delay:var(--shine-delay,0s); pointer-events:none;
}
```

```js
function addShine(selector, delayBase = 0) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('shine-border');
    el.style.setProperty('--shine-delay', `${delayBase + i * 0.4}s`);
  });
}
```

---

## Slide Transition Engine (GSAP)

```js
const animated = new Set();

function goTo(n) {
  if (n < 1 || n > TOTAL || n === cur) return;
  const dir = n > cur ? 1 : -1;
  const leaving = document.getElementById('s' + cur);
  const entering = document.getElementById('s' + n);
  const prev = cur; cur = n;

  const type = getTransitionType(prev, cur);

  if (type === 'fadeBlack') {
    // S7 ↔ S8: fade through black
    gsap.to(leaving, { opacity:0, duration:0.3, ease:'power1.in', onComplete: () => {
      leaving.classList.remove('active'); gsap.set(leaving, {opacity:0});
      entering.classList.add('active');
      gsap.fromTo(entering, {opacity:0}, {opacity:1, duration:0.4, ease:'power1.out', onComplete:()=>runSlideAnimations(cur)});
    }});
  } else if (type === 'verticalDrop') {
    // S10 → S11: vertical drop
    gsap.to(leaving, { y:-50, opacity:0, duration:0.4, ease:'power2.in', onComplete: () => {
      leaving.classList.remove('active'); gsap.set(leaving, {y:0, opacity:0});
      entering.classList.add('active');
      gsap.fromTo(entering, {y:60,opacity:0}, {y:0,opacity:1, duration:0.55, ease:'power3.out', onComplete:()=>runSlideAnimations(cur)});
    }});
  } else {
    // Standard cinematic push
    gsap.to(leaving, {opacity:0, x:dir*-55, duration:0.4, ease:'power2.in', onComplete:()=>{ leaving.classList.remove('active'); gsap.set(leaving,{x:0,opacity:0}); }});
    entering.classList.add('active');
    gsap.fromTo(entering, {opacity:0, x:dir*70}, {opacity:1, x:0, duration:0.52, ease:'power3.out', delay:0.05, onComplete:()=>runSlideAnimations(cur)});
  }
  updateHUD(n);
}

function getTransitionType(from, to) {
  if ((from===7&&to===8)||(from===8&&to===7)) return 'fadeBlack';
  if (from===10&&to===11) return 'verticalDrop';
  return 'push';
}

function runSlideAnimations(n) {
  if (animated.has(n)) return;
  animated.add(n);
  const fn = slideAnimations[n];
  if (fn) fn();
}
```

---

## Per-Slide Animation Functions

```js
const slideAnimations = {
  1:animateS1, 2:animateS2, 3:animateS3, 4:animateS4, 5:animateS5,
  6:animateS6, 7:animateS7, 8:animateS8, 9:animateS9, 10:animateS10, 11:animateS11
};

function animateS1() {
  // Glitch effect on "AI Strategy" span
  initGlitch('#s1 .glitch-target');
  // Word-by-word blur reveal on h1 (excluding glitch span)
  textAnimate('#s1 h1 .reveal-text', { by:'word', animation:'blurInUp', delay:0.2 });
  // Typewriter on tagline
  typewriter('#s1 .title-tagline', ['Simple. Focused. Built to win.'], { speed:60, loop:false });
  blurFadeIn('#s1 .rule', { delay:1.2 });
  blurFadeIn('#s1 .title-tag', { delay:1.35 });
  setTimeout(() => gsap.to('#s1 .rule', { boxShadow:'0 0 18px rgba(245,168,0,0.45)', duration:1.4, repeat:-1, yoyo:true, ease:'sine.inOut' }), 1400);
}

function animateS2() {
  blurFadeIn('#s2 .eyebrow', {});
  blurFadeIn('#s2 h2', { delay:0.1 });
  gsap.fromTo('#s2 .bq', {opacity:0,x:-20}, {opacity:1,x:0,duration:0.5,ease:'power2.out',delay:0.25});
  gsap.fromTo('#s2 tbody tr', {opacity:0,y:10}, {opacity:1,y:0,stagger:0.08,duration:0.35,ease:'power2.out',delay:0.45});
  setTimeout(() => {
    numberTicker('#s2 .stat-12', { to:12, prefix:'~', suffix:'%', duration:0.9 });
    setTimeout(() => numberTicker('#s2 .stat-20', { to:20, prefix:'<', suffix:'%', duration:0.9 }), 150);
    setTimeout(() => slotMachineReveal('#s2 .stat-3x', '3–4×', 700), 300);
  }, 650);
  setTimeout(() => {
    gsap.fromTo('#s2 .closing-l1', {opacity:0}, {opacity:0.5, duration:0.4});
    setTimeout(() => gsap.fromTo('#s2 .closing-l2', {opacity:0,scale:1.04}, {opacity:1,scale:1,duration:0.5,ease:'back.out(1.4)'}), 500);
  }, 1150);
}

function animateS3() {
  blurFadeIn('#s3 .eyebrow, #s3 h2', { stagger:0.1 });
  blurFadeIn('#s3 .italic', { delay:0.2 });
  gsap.fromTo('#s3 .three > .card', {opacity:0,x:-28,scale:0.97}, {opacity:1,x:0,scale:1,stagger:0.15,duration:0.55,ease:'power3.out',delay:0.35});
  gsap.fromTo('#s3 .slist li', {opacity:0,x:-10}, {opacity:1,x:0,stagger:0.05,duration:0.28,ease:'power1.out',delay:0.75});
}

function animateS4() {
  blurFadeIn('#s4 .eyebrow, #s4 h2', { stagger:0.1 });
  gsap.fromTo('#s4 .card', {opacity:0,y:14}, {opacity:1,y:0,stagger:0.1,duration:0.4,ease:'power2.out',delay:0.2});
  gsap.fromTo('#s4 .slist li', {opacity:0,x:-8}, {opacity:1,x:0,stagger:0.05,duration:0.25,ease:'power1.out',delay:0.4});
  wordPullUp('#s4 .pipeline-label', { delay:0.4 });
  setTimeout(() => animatePipeline(), 600);
  gsap.fromTo('#s4 .mnum', {opacity:0,scale:0.85}, {opacity:1,scale:1,duration:0.5,ease:'back.out(1.5)',delay:0.5});
}

function animateS5() {
  blurFadeIn('#s5 .eyebrow, #s5 h2', { stagger:0.1 });
  gsap.fromTo('#s5 .slist li', {opacity:0,x:-10}, {opacity:1,x:0,stagger:0.06,duration:0.3,ease:'power1.out',delay:0.3});
  gsap.fromTo('#s5 .metric-box', {opacity:0,scale:0.92}, {opacity:1,scale:1,stagger:0.12,duration:0.4,ease:'back.out(1.4)',delay:0.4});
  setTimeout(() => {
    countUpRange('#s5 .stat-20-30');
    numberTicker('#s5 .stat-10', { to:10, suffix:'%', duration:1.0 });
    numberTicker('#s5 .stat-5', { to:5, suffix:'pt', duration:0.9 });
  }, 550);
  gsap.fromTo('#s5 .card-t', {opacity:0,y:12}, {opacity:1,y:0,duration:0.4,ease:'power2.out',delay:0.85});
}

function animateS6() {
  blurFadeIn('#s6 .eyebrow, #s6 h2', { stagger:0.1 });
  blurFadeIn('#s6 .bq', { delay:0.2, direction:'left' });
  gsap.fromTo(document.querySelectorAll('#s6 .step-row:not(.step-2)'), {opacity:0,x:-12}, {opacity:1,x:0,stagger:0.07,duration:0.35,ease:'power2.out',delay:0.35});
  gsap.fromTo('#s6 tbody tr', {opacity:0,x:14}, {opacity:1,x:0,stagger:0.07,duration:0.3,ease:'power2.out',delay:0.45});
  gsap.fromTo('#s6 .chip', {opacity:0,y:8}, {opacity:1,y:0,stagger:0.06,duration:0.25,ease:'power1.out',delay:0.9});
  // TextMorph Step 2 — the showstopper
  setTimeout(() => {
    const row = document.querySelector('#s6 .step-2');
    if (!row) return;
    morphText(row.querySelector('.step-old'), row.querySelector('.step-new'), 700);
  }, 900);
}

function animateS7() {
  blurFadeIn('#s7 .eyebrow, #s7 h2', { stagger:0.1 });
  blurFadeIn('#s7 .situation-text', { delay:0.2 });
  gsap.fromTo('#s7 .pillar-card', {opacity:0,y:20,scale:0.97}, {opacity:1,y:0,scale:1,stagger:0.14,duration:0.5,ease:'power3.out',delay:0.3});
  gsap.fromTo('#s7 tbody tr', {opacity:0}, {opacity:1,stagger:0.07,duration:0.28,delay:0.55});
  gsap.set('#s7 .after-cell', { color:'rgba(255,255,255,0.2)' });
  setTimeout(() => {
    document.querySelectorAll('#s7 .after-cell').forEach((cell, i) => {
      setTimeout(() => gsap.to(cell, {color:'var(--teal)',duration:0.4,ease:'power2.out'}), i*160);
    });
  }, 1000);
  blurFadeIn('#s7 .bq', { delay:1.7 });
}

function animateS8() {
  textAnimate('#s8 h2', { by:'word', animation:'blurInUp', delay:0.3 });
  blurFadeIn('#s8 .bq', { delay:0.75, direction:'left' });
  gsap.fromTo('#s8 .card', {opacity:0,scale:0.93,y:20}, {opacity:1,scale:1,y:0,stagger:0.12,duration:0.5,ease:'back.out(1.3)',delay:0.9});
  wordPullUp('#s8 .eyebrow', { delay:0.1 });
}

function animateS9() {
  blurFadeIn('#s9 .eyebrow, #s9 h2', { stagger:0.1 });
  gsap.fromTo('#s9 .left-table tbody tr',  {opacity:0,x:-16}, {opacity:1,x:0,stagger:0.09,duration:0.38,ease:'power2.out',delay:0.35});
  gsap.fromTo('#s9 .right-table tbody tr', {opacity:0,x:16},  {opacity:1,x:0,stagger:0.09,duration:0.38,ease:'power2.out',delay:0.55});
}

function animateS10() {
  blurFadeIn('#s10 .eyebrow, #s10 h2', { stagger:0.1 });
  gsap.fromTo('#s10 .goal-item', {opacity:0,scale:0.92,y:16}, {opacity:1,scale:1,y:0,stagger:0.08,duration:0.45,ease:'back.out(1.4)',delay:0.3});
  setTimeout(() => {
    numberTicker('#s10 .gn-30a', { to:30, suffix:'%', duration:1.1 });
    numberTicker('#s10 .gn-10',  { to:10, suffix:'%', duration:1.0, delay:0.1 });
    numberTicker('#s10 .gn-5',   { to:5,  suffix:' pts', duration:0.9, delay:0.2 });
    numberTicker('#s10 .gn-70',  { to:70, suffix:'%+', duration:1.1, delay:0.1 });
    numberTicker('#s10 .gn-30b', { to:30, suffix:'%', duration:1.0, delay:0.15 });
    setTimeout(() => slotMachineReveal('#s10 .gn-all', 'All', 800), 400);
  }, 500);
}

function animateS11() {
  gsap.fromTo('#s11 .rule', {scaleX:0}, {scaleX:1,duration:0.4,ease:'power2.out',transformOrigin:'left'});
  textAnimate('#s11 h2', { by:'word', animation:'blurInUp', delay:0.2, staggerDelay:0.05 });
  blurFadeIn('#s11 p', { delay:0.9 });
  gsap.fromTo('#s11 .bq', {opacity:0,scale:1.05}, {opacity:1,scale:1,duration:0.55,ease:'back.out(1.6)',delay:1.3});
  blurFadeIn('#s11 .hashtag', { delay:1.7 });
}
```

---

## HTML Changes Required

### S1 — Glitch + gradient text markup
```html
<!-- In h1, wrap the accent phrase -->
<h1>
  <span class="reveal-text">Crowe Consulting</span><br>
  <span class="glitch-target gradient-text">AI Strategy</span>
</h1>
```

### S1 + S11 + S11 — Canvas elements
```html
<!-- S1: amber particles (inside .t-left) -->
<canvas id="s1-particles" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;"></canvas>

<!-- S3: aurora layer (first child of .bg-ov) -->
<div class="aurora-bg"></div>

<!-- S11: shooting stars + particles -->
<canvas id="s11-stars"     style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;"></canvas>
<canvas id="s11-particles" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;"></canvas>
```

### S4 — Replace pipeline div with SVG
(See AnimatedBeam SVG markup above)

### S6 — Step 2 TextMorph markup
```html
<div class="step-row step-2">
  <span class="step-num">2</span>
  <div>
    <p class="step-old">How can we use AI in this offering?</p>
    <p class="step-new" style="opacity:0;display:none;">Where in our client's value chain can AI materially improve outcomes?</p>
  </div>
</div>
```
Add `step-row` to all step divs in S6, `step-2` to the second.

### S7 — Class additions
- Add `pillar-card` to each of the 3 pillar action cards
- Add `after-cell` to each teal `<td>` in the before/after table
- Add `situation-text` to the opening `<p>`

### S2 — Stat classes
- Add `stat-12`, `stat-20`, `stat-3x` to the three inaction stat number elements
- Add `closing-l1`, `closing-l2` to the two closing statement lines

### S5 — Metric classes
- Add `metric-box` to each teal stat box
- Add `stat-20-30`, `stat-10`, `stat-5` to the number elements inside them

### S10 — Goal number classes
- Add `gn-30a`, `gn-10`, `gn-5`, `gn-70`, `gn-30b`, `gn-all` to each `.goal-num`

### S9 — Table classes
- Add `left-table` to Start Now table, `right-table` to Build Toward

---

## Global Init (DOMContentLoaded)

```js
document.addEventListener('DOMContentLoaded', () => {
  // Spotlight effects
  initMagicCards();                         // all cards
  initCardSpotlight('#s3 .card');           // S3 pillar cards — brighter spotlight
  initTiltCards('#s10 .goal-item', 6);      // S10 goal items — 3D tilt

  // Border effects
  addBorderBeam('#s10 .goal-item.hi', 0);
  addBorderBeam('#s11 .bq', 1.2);
  addShine('#s3 .card', 0.5);
  addNeonCard('#s10 .goal-item.hi');
  addNeonCard('#s5 .metric-box:first-child');

  // Gradient text
  document.querySelectorAll('.gradient-text').forEach(el => el.classList.add('gradient-text'));

  // Card hover lift
  document.querySelectorAll('.card, .goal-item, .step').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, {y:-3, boxShadow:'0 10px 36px rgba(0,0,0,0.35)', duration:0.2, ease:'power2.out'}));
    el.addEventListener('mouseleave', () => gsap.to(el, {y:0, boxShadow:'none', duration:0.2, ease:'power2.in'}));
  });

  // Nav button hover
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => gsap.to(btn, {scale:1.12, duration:0.15}));
    btn.addEventListener('mouseleave', () => gsap.to(btn, {scale:1, duration:0.15}));
  });

  // Particles
  initParticles('s1-particles', { quantity:55, color:'#F5A800', size:0.5, ease:75, staticity:45 });
  initParticles('s11-particles', { quantity:30, color:'#F5A800', size:0.4, ease:85, staticity:55 });
  initShootingStars('s11-stars');

  // Fire S1 immediately
  runSlideAnimations(1);
});
```

---

## Recommended Deck Stack (Final)

| Slide | Effects |
|---|---|
| **S1** | Particles bg · GlitchText on "AI Strategy" · GradientText · TextAnimate word reveal · Typewriter tagline · Amber rule glow |
| **S2** | AnimatedGrid bg texture · BlurFade entrances · Table row stagger · NumberTicker stats · SlotMachine 3–4× · Closing statement punch |
| **S3** | AuroraBackground · CardSpotlight (bright) · ShineBorder · Card stagger · Sub-bullet stagger |
| **S4** | BlurFade · AnimatedBeam pipeline SVG draw · WordPullUp · MagicCard · Card hover lift |
| **S5** | AnimatedGrid bg · BlurFade · NumberTicker count-ups · Metric box scale-in · NeonCard on hero KPI |
| **S6** | BlurFade · Step stagger · TextMorph Step 2 flip · Outcomes table row reveal · Capability chips slide up |
| **S7** | Full-bleed bg · BlurFade · 3-pillar card stagger · Before/After teal light-up · Takeaway quote fade |
| **S8** | FadeBlack transition in · TextAnimate word reveal · BlurFade · Card scale-in |
| **S9** | AnimatedGrid bg · BlurFade · Left table stagger from left · Right table stagger from right |
| **S10** | Goals bg · TiltCard on all tiles · BorderBeam + NeonCard on "All" · NumberTicker all 5 stats · SlotMachine "All" |
| **S11** | VerticalDrop transition in · ShootingStars · Particles · TextAnimate word reveal · BorderBeam quote · BlurFade hashtag |

---

## Final Build Steps

1. Install all components via the Full Install Block above
2. Extract vanilla JS logic from each installed component
3. Implement all animations + HTML changes in `Crowe-AI-Strategy-Presentation.html`
4. Test every slide forward and backward — no replays on back-nav
5. Run `node bake-images.cjs` → `Crowe-AI-Strategy-Presentation-STANDALONE.html`

---

## Master Summary Table

| Component | Source | Install | Used On | Port |
|---|---|---|---|---|
| BlurFade | magicui | `npx shadcn@latest add @magicui/blur-fade` | All slides | GSAP |
| TextAnimate | magicui | `npx shadcn@latest add @magicui/text-animate` | S1, S8, S11 | GSAP |
| NumberTicker | magicui | `npx shadcn@latest add @magicui/number-ticker` | S2, S5, S10 | GSAP |
| MagicCard | magicui | `npx shadcn@latest add @magicui/magic-card` | All cards | Vanilla mousemove |
| Particles | magicui | `npx shadcn@latest add @magicui/particles` | S1, S11 | Canvas |
| AnimatedBeam | magicui | `npx shadcn@latest add @magicui/animated-beam` | S4 pipeline | SVG dashoffset |
| BorderBeam | magicui | `npx shadcn@latest add @magicui/border-beam` | S10, S11 | CSS conic |
| ShineBorder | magicui | `npx shadcn@latest add @magicui/shine-border` | S3 | CSS |
| CardSpotlight | 21st.dev | `npx shadcn@latest add https://21st.dev/r/aceternity/card-spotlight` | S3 | Vanilla mousemove |
| AuroraBackground | 21st.dev | `npx shadcn@latest add https://21st.dev/r/aceternity/aurora-background` | S3 bg | CSS keyframes |
| ShootingStars | 21st.dev | `npx shadcn@latest add https://21st.dev/r/aceternity/shooting-stars` | S11 bg | Canvas |
| TextMorph | 21st.dev | `npx shadcn@latest add https://21st.dev/r/ibelick/text-morph` | S6 Step 2 | GSAP morph |
| NumberFlow | 21st.dev | `npx shadcn@latest add https://21st.dev/r/barvian/number-flow-transitions` | S10 "All" | Slot machine |
| AnimatedGradientText | 21st.dev | `npx shadcn@latest add https://21st.dev/r/dillionverma/animated-gradient-text` | S1, S11 | CSS |
| GlitchText | 21st.dev | `npx shadcn@latest add https://21st.dev/r/anurag-mishra22/animated-glitch-text` | S1 title | CSS |
| TypewriterText | 21st.dev | `npx shadcn@latest add https://21st.dev/r/preetsuthar17/typewriter-text` | S1 tagline | Vanilla JS |
| NeonGradientCard | 21st.dev | `npx shadcn@latest add https://21st.dev/r/dillionverma/neon-gradient-card` | S5, S10 | CSS |
| WordPullUp | 21st.dev | `npx shadcn@latest add https://21st.dev/r/dillionverma/word-pull-up` | S4, S8 | GSAP spring |
| Tilt | 21st.dev | open 21st.dev — install command not verified | S10 tiles | Vanilla 3D |
| AnimatedGridPattern | 21st.dev | open 21st.dev — install command not verified | S2, S5, S9 bg | CSS |
| GSAP | npm | `npm install gsap` | All transitions | Direct |
| Motion | npm | `npm install motion` | Peer dep | — |
