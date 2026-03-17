---
name: deck-builder
description: >
  Build polished, branded HTML presentation decks for Crowe client engagements.
  Use when the user asks to create a pitch deck, workshop slide deck, executive
  presentation, or any slide-based HTML deliverable. Captures the full Crowe
  design system, Vite/React/Tailwind build pipeline, PDF export process, and
  an interview-driven workflow for asset elicitation. The output is always a
  single portable HTML file built to the standard of empower-deck v3.3.
version: "1.0"
owner: AI Innovation Team
---

# Deck Builder Skill

This skill governs the creation of HTML presentation decks for Crowe client
engagements. Every deck must match the quality bar of empower-deck v3.3:
pixel-perfect Crowe branding, slide-based navigation, smooth transitions,
data-separated architecture, and a single portable HTML output.

Decks must never look the same. Layouts, motion patterns, accent color usage,
and UI component selection should vary per project. What stays constant is
correctness, brand compliance, and build quality.

---

## How to Use This Skill

If the decksmith MCP is installed, run the interview via:
  deck_interview (mode: "full")

Otherwise, follow the interview protocol in DECK-SKILL.md:
  C:\Users\RachurA\AI Coding Projects\decksmith\docs\DECK-SKILL.md

After the interview, call deck_generate_asset_docs (or produce the four
asset documents manually) and wait for asset confirmation before building.

---

## Quick Reference

**Stack:** Vite 5 + React 18 + TypeScript + Tailwind + Framer Motion + Anime.js v4
**Output:** Single HTML file, all assets base64-inlined via vite-plugin-singlefile
**Tokens:** See crowe://design-tokens or docs/DECK-SKILL.md
**Components:** ReactBits + 21st.dev — see crowe://component-registry

**Data layer rule:** ALL slide content lives in src/data/slides.ts.
Zero hardcoded strings in JSX components — ever.

**Design variation rule:** Pick one vibe per deck (executive/luxury,
data-analytical, product demo, regulatory, workshop, story-editorial)
and one dominant motion strategy. Never mix patterns.

**Crowe core tokens:**
  crowe-indigo-dark:  #011E41  (default dark bg)
  crowe-blue:         #0075C9  (primary accent)
  crowe-coral:        #E5376B  (risk/alert)
  crowe-amber:        #F5A800  (warning/highlight)

**Quality gate:** Run deck_quality_check before declaring done.
Every item in the checklist must pass. See DECK-SKILL.md Phase 4.

---

## Implementation Rules (avoid the common revision cycles)

**Interactive slides:** Write a behavioral spec FIRST (trigger, layout change, content, dismiss).
The two-panel split is the default pattern: cards collapse into left ~36%, detail panel at right ~62%.

**Charts:** Always `maintainAspectRatio: false` + height-constrained container. Show ONLY the
metrics from the spec — no "Current vs Target" bars unless explicitly requested. Guard against
re-initialization. Delay render if chart is inside an animated panel (≥ animation duration ms).

**Card lists:** All cards have identical default border/bg. Only the active card gets an accent
border. Shimmer/glow/border-beam = hover-only (`opacity:0` default, `opacity:1` on `:hover`).

**Font sizing:** Start generous. `clamp(14px,1.35vw,17px)` body, 20–24px card padding.
Tighten in one pass if needed — opening up tight text takes 3–4 rounds.

**CSS specificity:** Before adding a new rule for any selector, search for existing rules
targeting the same selector. Update in place — never add a second block.
