export const designVariationGuideUri = 'crowe://design-variation-guide';
export function getDesignVariationGuideContent() {
    return `# Design Variation Guide — Crowe Deck Builder

Decks must never look the same. Use this table to choose a visual direction,
then execute it consistently throughout the deck.

## Vibe → Layout / Motion / Accent Table

| Vibe | Layout Pattern | Motion Strategy | Accent | Card Treatment |
|------|----------------|-----------------|--------|----------------|
| Executive / luxury | Wide margins, 1 idea per slide | Scale + blur, slow | Amber | Borderless, generous spacing |
| Data / analytical | Dense info grids, bento layouts | Stagger reveal, countUp | Blue | Subtle border, low-opacity bg |
| Product demo | Left rail nav, content pane right | Slide wipe, step sequence | Blue | Clean, UI-style |
| Regulatory / risk | Two-column text heavy, structured | Fade up, minimal motion | Coral | Outlined, formal |
| Workshop / interactive | Tab/toggle panels, diagram slides | Physics hover, magnetic | Amber | Elevated shadow, hover glow |
| Story / editorial | Full-bleed images, large type | Word split, cinematic | Coral | Overlay only, no outlines |

## Animation Pattern Reference

| Pattern | When to use | Libraries |
|---------|-------------|-----------|
| Staggered card reveal (bottom-up fade) | Data-heavy, analytical | Framer Motion \`staggerChildren\` |
| Word-by-word text split | Story-driven, editorial | ReactBits \`SplitText\` |
| Kinetic number countUp | Stats-heavy | ReactBits \`CountUp\` or Anime.js |
| Slide wipe (horizontal clip) | Product walkthroughs | Framer Motion \`clipPath\` |
| Scale + blur entrance | Luxury, executive | Framer Motion \`scale\` + \`filter\` |
| Particle / aurora ambient | Hero backgrounds | CSS keyframes or ReactBits \`Particles\` |
| Magnetic / physics hover | Interactive demos | ReactBits hover components |

## Rules

1. Pick ONE dominant animation pattern and execute it across all slides.
2. Never mix more than 2 animation strategies in a single deck.
3. Vary layouts between decks — the audience should not recognize the template.
4. Accent color sets the emotional tone — Coral for risk/urgency, Amber for
   warmth/leadership, Blue for capability/data.
`;
}
//# sourceMappingURL=design-variation-guide.js.map