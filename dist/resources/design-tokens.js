import { croweColors, croweFontFamilies, cssVariablesDark, cssVariablesLight, tailwindColorsBlock } from '../data/crowe-tokens.js';
export const designTokensUri = 'crowe://design-tokens';
export function getDesignTokensContent() {
    return `# Crowe Design Tokens — empower-deck v3.3

## Tailwind Config (theme.extend)

\`\`\`typescript
// tailwind.config.ts — theme.extend
${tailwindColorsBlock}

fontFamily: {
  display: ${JSON.stringify(croweFontFamilies.display)},
  body:    ${JSON.stringify(croweFontFamilies.body)},
  mono:    ${JSON.stringify(croweFontFamilies.mono)},
},
\`\`\`

## CSS Variables

\`\`\`css
${cssVariablesDark}

${cssVariablesLight}
\`\`\`

## Color Reference

${Object.entries(croweColors)
        .filter(([k]) => k !== 'tint')
        .map(([k, v]) => `- \`${k}\`: \`${v}\``)
        .join('\n')}

### Tint Scale
${Object.entries(croweColors.tint).map(([k, v]) => `- \`tint-${k}\`: \`${v}\``).join('\n')}
`;
}
//# sourceMappingURL=design-tokens.js.map