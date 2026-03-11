export const viteConfigUri = 'crowe://templates/vite-config';
export function getViteConfigContent() {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
`;
}
//# sourceMappingURL=vite-config.js.map