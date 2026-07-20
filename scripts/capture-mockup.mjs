import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'mockups')
const outFile = path.join(outDir, 'dashboard-phone-mockup.png')

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1400, height: 1000 },
  deviceScaleFactor: 2
})

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
await page.waitForSelector('#mockup', { state: 'visible' })
await page.waitForTimeout(1500)

await page.evaluate(() => {
  const el = document.getElementById('mockup')
  if (!el) return
  el.style.background = '#08080A'
  el.style.padding = '40px 56px 56px'
  el.style.borderRadius = '24px'
})

const mockup = page.locator('#mockup')
await mockup.screenshot({ path: outFile, type: 'png' })

await browser.close()
console.log(`Saved: ${outFile}`)
