import { renderComponentTable } from '../data/components.js';
export const componentRegistryUri = 'crowe://component-registry';
export function getComponentRegistryContent() {
    return `# Component Registry — Crowe Deck Builder

${renderComponentTable()}

## Slide Type → Component Mapping

| Slide Type | Recommended Components |
|------------|----------------------|
| Hero / Title | SplitText, BlurText, Aurora, Particles |
| Section Divider | GradientText, Ribbons |
| Stat / Metric Grid | CountUp, AnimatedNumber, Number Ticker, SpotlightCard, TiltCard |
| Timeline / Process | Timeline (21st.dev), AnimatedList |
| Feature / Bento Grid | Bento Grid (21st.dev), TiltCard, Border Beam |
| Logo Showcase | Marquee |
| CTA / Closing | ShimmerButton, MagneticButton, Blur Fade In |
| Flow / Connector | Animated Beam (21st.dev) |
| Typewriter Title | Typing Animation (21st.dev), Word Rotate (21st.dev) |
| Interactive / Tabs | Orbit (21st.dev) |
`;
}
//# sourceMappingURL=component-registry.js.map