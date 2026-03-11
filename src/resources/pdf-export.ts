export const pdfExportUri = 'crowe://templates/pdf-export'

export function getPdfExportContent(): string {
  return `// scripts/export-pdf.ts
// Run with: npx tsx scripts/export-pdf.ts
// Requires: npm install -D puppeteer tsx

import puppeteer from 'puppeteer'
import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function exportPdf() {
  const distFile = path.resolve(__dirname, '../dist/index.html')
  const outputFile = path.resolve(__dirname, '../dist/deck.pdf')

  if (!fs.existsSync(distFile)) {
    console.error('dist/index.html not found. Run: npm run build')
    process.exit(1)
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 810 })
  await page.goto(\`file://\${distFile}\`, { waitUntil: 'networkidle0' })

  // Wait for animations to complete
  await page.waitForTimeout(1000)

  // Get total slide count from the page
  const slideCount = await page.evaluate(() => {
    const counter = document.querySelector('[data-slide-count]')
    return counter ? parseInt(counter.getAttribute('data-slide-count') ?? '1') : 1
  })

  console.log(\`Exporting \${slideCount} slides to PDF...\`)

  // Flatten animations for PDF
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--animation-duration', '0ms')
    document.documentElement.classList.add('pdf-export')
  })

  const pdfBuffers: Buffer[] = []

  for (let i = 0; i < slideCount; i++) {
    // Navigate to slide i
    await page.evaluate((slideIndex: number) => {
      const event = new CustomEvent('pdf-navigate', { detail: { index: slideIndex } })
      window.dispatchEvent(event)
    }, i)

    await page.waitForTimeout(200)

    const buffer = await page.pdf({
      width: '1440px',
      height: '810px',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    pdfBuffers.push(Buffer.from(buffer))
    console.log(\`  Slide \${i + 1}/\${slideCount}\`)
  }

  await browser.close()

  // Merge PDFs — for simplicity, export all slides as one PDF call
  // For proper merging, use pdf-lib or pdf-merge
  const finalBuffer = await exportAllSlides(distFile)
  fs.writeFileSync(outputFile, finalBuffer)

  console.log(\`\\nPDF saved to: dist/deck.pdf\`)
}

async function exportAllSlides(distFile: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 810 })
  await page.goto(\`file://\${distFile}\`, { waitUntil: 'networkidle0' })
  await page.waitForTimeout(1500)

  await page.evaluate(() => {
    document.documentElement.classList.add('pdf-export')
    // Show all slides for print
    const style = document.createElement('style')
    style.textContent = \`
      @media print {
        .pdf-export [data-slide] { display: flex !important; position: relative !important; break-after: page; }
        .pdf-export [data-slide-nav] { display: none !important; }
      }
    \`
    document.head.appendChild(style)
  })

  const buffer = await page.pdf({
    width: '1440px',
    height: '810px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  await browser.close()
  return Buffer.from(buffer)
}

exportPdf().catch(console.error)
`
}
