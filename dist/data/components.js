// Component registry — ReactBits + 21st.dev
// Maps slide types to recommended UI components.
export const reactbitsComponents = [
    { name: 'SplitText', source: 'reactbits', slug: 'SplitText', bestFor: 'Hero titles, section headers — word/char reveal' },
    { name: 'BlurText', source: 'reactbits', slug: 'BlurText', bestFor: 'Subheadings that fade in from blur' },
    { name: 'GradientText', source: 'reactbits', slug: 'GradientText', bestFor: 'Accent headlines, stat labels' },
    { name: 'ShimmerButton', source: 'reactbits', slug: 'ShimmerButton', bestFor: 'CTA buttons' },
    { name: 'MagneticButton', source: 'reactbits', slug: 'MagneticButton', bestFor: 'Interactive nav or CTA' },
    { name: 'TiltCard', source: 'reactbits', slug: 'TiltCard', bestFor: 'Feature/capability cards with 3D hover' },
    { name: 'Aurora', source: 'reactbits', slug: 'Aurora', bestFor: 'Hero section ambient background' },
    { name: 'Particles', source: 'reactbits', slug: 'Particles', bestFor: 'Hero or divider backgrounds' },
    { name: 'CountUp', source: 'reactbits', slug: 'CountUp', bestFor: 'Animated stat numbers' },
    { name: 'AnimatedNumber', source: 'reactbits', slug: 'AnimatedNumber', bestFor: 'Precision number animation with decimals' },
    { name: 'Marquee', source: 'reactbits', slug: 'Marquee', bestFor: 'Logo cloud, scrolling partner logos' },
    { name: 'SpotlightCard', source: 'reactbits', slug: 'SpotlightCard', bestFor: 'Cards with cursor-tracked spotlight glow' },
    { name: 'AnimatedList', source: 'reactbits', slug: 'AnimatedList', bestFor: 'List items that animate in on reveal' },
    { name: 'Ribbons', source: 'reactbits', slug: 'Ribbons', bestFor: 'Animated stripe/ribbon background' },
    { name: 'TextPressure', source: 'reactbits', slug: 'TextPressure', bestFor: 'Bold display type that responds to cursor' },
];
export const twentyFirstDevComponents = [
    { name: 'Animated Beam', source: '21stdev', slug: 'animated-beam', installCmd: 'npx shadcn@latest add "https://21st.dev/r/animated-beam"', bestFor: 'Connecting nodes, flow diagrams' },
    { name: 'Bento Grid', source: '21stdev', slug: 'bento-grid', installCmd: 'npx shadcn@latest add "https://21st.dev/r/bento-grid"', bestFor: 'Feature/capability grids' },
    { name: 'Timeline', source: '21stdev', slug: 'timeline', installCmd: 'npx shadcn@latest add "https://21st.dev/r/timeline"', bestFor: 'Process flows, roadmaps' },
    { name: 'Number Ticker', source: '21stdev', slug: 'number-ticker', installCmd: 'npx shadcn@latest add "https://21st.dev/r/number-ticker"', bestFor: 'CountUp alternative' },
    { name: 'Border Beam', source: '21stdev', slug: 'border-beam', installCmd: 'npx shadcn@latest add "https://21st.dev/r/border-beam"', bestFor: 'Animated border on cards' },
    { name: 'Word Rotate', source: '21stdev', slug: 'word-rotate', installCmd: 'npx shadcn@latest add "https://21st.dev/r/word-rotate"', bestFor: 'Headline that cycles through words' },
    { name: 'Typing Animation', source: '21stdev', slug: 'typing-animation', installCmd: 'npx shadcn@latest add "https://21st.dev/r/typing-animation"', bestFor: 'Typewriter title effect' },
    { name: 'Blur Fade In', source: '21stdev', slug: 'blur-fade-in', installCmd: 'npx shadcn@latest add "https://21st.dev/r/blur-fade-in"', bestFor: 'Standard entrance animation' },
    { name: 'Orbit', source: '21stdev', slug: 'orbit', installCmd: 'npx shadcn@latest add "https://21st.dev/r/orbit"', bestFor: 'Circular rotating elements' },
];
export const allComponents = [
    ...reactbitsComponents,
    ...twentyFirstDevComponents,
];
export function renderComponentTable() {
    const rb = reactbitsComponents.map(c => `| ${c.name.padEnd(18)} | reactbits.dev | ${c.bestFor} |`).join('\n');
    const tfd = twentyFirstDevComponents.map(c => `| ${c.name.padEnd(18)} | 21st.dev      | ${c.bestFor} |\n|                    | Install: \`${c.installCmd}\` | |`).join('\n');
    return `## ReactBits Components\n| Component | Source | Best For |\n|-----------|--------|----------|\n${rb}\n\n## 21st.dev Components\n| Component | Source | Best For |\n|-----------|--------|----------|\n${tfd}`;
}
//# sourceMappingURL=components.js.map