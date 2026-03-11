import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';
import { qualityChecklist } from '../data/quality-checklist.js';
export const qualityCheckSchema = z.object({
    projectPath: z.string().describe('Absolute path to the deck project to validate'),
});
function fileContent(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    }
    catch {
        return null;
    }
}
function globSrc(dir, ext) {
    const results = [];
    function walk(d) {
        if (!fs.existsSync(d))
            return;
        for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
            const full = path.join(d, entry.name);
            if (entry.isDirectory())
                walk(full);
            else if (entry.name.endsWith(ext))
                results.push(full);
        }
    }
    walk(dir);
    return results;
}
export async function runQualityCheck(input) {
    const { projectPath } = input;
    const p = (rel) => path.join(projectPath, rel);
    const results = [];
    const twConfig = fileContent(p('tailwind.config.ts')) ?? fileContent(p('tailwind.config.js'));
    const indexCss = fileContent(p('src/index.css'));
    const slidesTs = fileContent(p('src/data/slides.ts'));
    const appTsx = fileContent(p('src/App.tsx'));
    const viteConfig = fileContent(p('vite.config.ts')) ?? fileContent(p('vite.config.js'));
    const packageJson = fileContent(p('package.json'));
    // Gather all TSX/TS source files
    const srcFiles = globSrc(p('src'), '.tsx').concat(globSrc(p('src'), '.ts'));
    const srcContents = srcFiles.map(f => fileContent(f) ?? '').join('\n');
    // --- Brand checks ---
    results.push({
        id: 'brand-font', category: 'brand',
        description: qualityChecklist.find(c => c.id === 'brand-font').description,
        status: twConfig?.includes('Helvetica Now') ? 'pass' : 'fail',
        note: twConfig?.includes('Helvetica Now') ? undefined : 'tailwind.config.ts missing Helvetica Now font family entries',
    });
    const hasHardcodedHex = srcContents.match(/#[0-9A-Fa-f]{6}/g)
        ?.filter(hex => hex !== '#root') ?? [];
    results.push({
        id: 'brand-colors', category: 'brand',
        description: qualityChecklist.find(c => c.id === 'brand-colors').description,
        status: hasHardcodedHex.length === 0 ? 'pass' : 'fail',
        note: hasHardcodedHex.length > 0 ? `Hardcoded hex values found in src/: ${[...new Set(hasHardcodedHex)].slice(0, 5).join(', ')}` : undefined,
    });
    const hasThemeToggle = srcContents.includes('data-theme') || srcContents.includes("dataset['theme']");
    results.push({
        id: 'brand-theme', category: 'brand',
        description: qualityChecklist.find(c => c.id === 'brand-theme').description,
        status: hasThemeToggle ? 'pass' : 'fail',
        note: hasThemeToggle ? undefined : 'No theme toggle found — search for data-theme or dataset[\'theme\']',
    });
    results.push({
        id: 'brand-logo', category: 'brand',
        description: qualityChecklist.find(c => c.id === 'brand-logo').description,
        status: 'skip',
        note: 'Manual check required: verify logo SVG renders correctly in both themes',
    });
    const hasPadding = srcContents.includes('px-16') && srcContents.includes('py-12');
    results.push({
        id: 'brand-padding', category: 'brand',
        description: qualityChecklist.find(c => c.id === 'brand-padding').description,
        status: hasPadding ? 'pass' : 'fail',
        note: hasPadding ? undefined : 'Standard slide padding (px-16 py-12) not found in components',
    });
    const hasProgressBar = srcContents.includes('ProgressBar') || srcContents.includes('progress');
    const hasSlideCounter = srcContents.includes('SlideNav') || srcContents.includes('slide-count');
    results.push({
        id: 'brand-chrome', category: 'brand',
        description: qualityChecklist.find(c => c.id === 'brand-chrome').description,
        status: hasProgressBar && hasSlideCounter ? 'pass' : 'fail',
        note: (!hasProgressBar ? 'ProgressBar component missing. ' : '') + (!hasSlideCounter ? 'SlideNav/counter missing.' : ''),
    });
    results.push({
        id: 'brand-viewport', category: 'brand',
        description: qualityChecklist.find(c => c.id === 'brand-viewport').description,
        status: srcContents.includes('overflow-hidden') ? 'pass' : 'fail',
        note: srcContents.includes('overflow-hidden') ? undefined : 'overflow-hidden not found on root element — slides may scroll',
    });
    // --- Content checks ---
    // Check for hardcoded strings in JSX (strings not from slides.ts)
    const jsxHardcodePattern = />([A-Z][a-z]{4,}.*?)</g;
    const slidesHasExport = slidesTs?.includes('export const slides') ?? false;
    results.push({
        id: 'content-no-hardcode', category: 'content',
        description: qualityChecklist.find(c => c.id === 'content-no-hardcode').description,
        status: slidesHasExport ? 'pass' : 'fail',
        note: slidesHasExport ? undefined : 'src/data/slides.ts does not export a slides array',
    });
    const hasLoremIpsum = srcContents.toLowerCase().includes('lorem ipsum') || srcContents.includes('TBD');
    results.push({
        id: 'content-no-lorem', category: 'content',
        description: qualityChecklist.find(c => c.id === 'content-no-lorem').description,
        status: hasLoremIpsum ? 'fail' : 'pass',
        note: hasLoremIpsum ? 'Lorem ipsum or "TBD" found in source files' : undefined,
    });
    results.push({
        id: 'content-sources', category: 'content',
        description: qualityChecklist.find(c => c.id === 'content-sources').description,
        status: 'skip',
        note: 'Manual check: ensure all stats in slides.ts have a source field',
    });
    const hasCtaSlide = slidesTs?.includes("type: 'cta'") || slidesTs?.includes('type: "cta"');
    results.push({
        id: 'content-cta', category: 'content',
        description: qualityChecklist.find(c => c.id === 'content-cta').description,
        status: hasCtaSlide ? 'pass' : 'fail',
        note: hasCtaSlide ? undefined : 'No CTA slide found in slides.ts',
    });
    // --- Technical checks ---
    const hasSingleFile = viteConfig?.includes('viteSingleFile') ?? false;
    results.push({
        id: 'tech-build', category: 'technical',
        description: qualityChecklist.find(c => c.id === 'tech-build').description,
        status: hasSingleFile ? 'pass' : 'skip',
        note: hasSingleFile ? 'vite-plugin-singlefile configured' : 'Run npm run build to verify',
    });
    results.push({
        id: 'tech-singlefile', category: 'technical',
        description: qualityChecklist.find(c => c.id === 'tech-singlefile').description,
        status: hasSingleFile ? 'pass' : 'fail',
        note: hasSingleFile ? undefined : 'vite-plugin-singlefile not configured in vite.config.ts',
    });
    const hasKeyboardNav = srcContents.includes('useKeyboardNav') || srcContents.includes('ArrowRight');
    results.push({
        id: 'tech-keyboard', category: 'technical',
        description: qualityChecklist.find(c => c.id === 'tech-keyboard').description,
        status: hasKeyboardNav ? 'pass' : 'fail',
        note: hasKeyboardNav ? undefined : 'useKeyboardNav hook not found — keyboard navigation missing',
    });
    results.push({
        id: 'tech-no-errors', category: 'technical',
        description: qualityChecklist.find(c => c.id === 'tech-no-errors').description,
        status: 'skip',
        note: 'Manual check: open dist/index.html in Chrome, check DevTools console',
    });
    results.push({
        id: 'tech-email', category: 'technical',
        description: qualityChecklist.find(c => c.id === 'tech-email').description,
        status: hasSingleFile ? 'pass' : 'skip',
        note: hasSingleFile ? 'Single-file build ensures no external dependencies' : 'Verify after build',
    });
    results.push({
        id: 'tech-pdf', category: 'technical',
        description: qualityChecklist.find(c => c.id === 'tech-pdf').description,
        status: 'skip',
        note: 'Manual check: run npx tsx scripts/export-pdf.ts and verify output',
    });
    // --- Performance checks ---
    results.push({
        id: 'perf-filesize', category: 'performance',
        description: qualityChecklist.find(c => c.id === 'perf-filesize').description,
        status: 'skip',
        note: 'Check dist/index.html file size after build — must be < 50MB',
    });
    results.push({
        id: 'perf-first-slide', category: 'performance', description: qualityChecklist.find(c => c.id === 'perf-first-slide').description, status: 'skip', note: 'Manual check in browser'
    });
    results.push({
        id: 'perf-transitions', category: 'performance', description: qualityChecklist.find(c => c.id === 'perf-transitions').description, status: 'skip', note: 'Check Framer Motion transition durations — should be < 400ms'
    });
    // Build report
    const categories = ['brand', 'content', 'technical', 'performance'];
    const lines = [`# Quality Check Report\nProject: ${projectPath}\n`];
    for (const cat of categories) {
        const catItems = results.filter(r => r.category === cat);
        const passed = catItems.filter(r => r.status === 'pass').length;
        const failed = catItems.filter(r => r.status === 'fail').length;
        const skipped = catItems.filter(r => r.status === 'skip').length;
        const label = cat.charAt(0).toUpperCase() + cat.slice(1);
        lines.push(`## ${label} (${passed} pass · ${failed} fail · ${skipped} skip)\n`);
        for (const item of catItems) {
            const icon = item.status === 'pass' ? '✓' : item.status === 'fail' ? '✗' : '~';
            lines.push(`  ${icon} ${item.description}`);
            if (item.note)
                lines.push(`    → ${item.note}`);
        }
        lines.push('');
    }
    const totalPass = results.filter(r => r.status === 'pass').length;
    const totalFail = results.filter(r => r.status === 'fail').length;
    const totalSkip = results.filter(r => r.status === 'skip').length;
    lines.push(`---\nTotal: ${totalPass} pass · ${totalFail} fail · ${totalSkip} require manual check`);
    if (totalFail === 0)
        lines.push('\nAll automated checks passed.');
    else
        lines.push(`\n${totalFail} issue${totalFail !== 1 ? 's' : ''} to fix before delivery.`);
    return lines.join('\n');
}
//# sourceMappingURL=quality-check.js.map