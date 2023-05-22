import fs from 'fs'
import puppeteer from 'puppeteer'
import { startFlow } from 'lighthouse'

async function captureReport () {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  const flow = await startFlow(page,

    {
      config: {
        extends: 'lighthouse:default',
        settings: {throttlingMethod: 'provided'}
      }
    })
  await flow.navigate('http://localhost:4200')

  await browser.close()
  fs.writeFileSync('report.html', await flow.generateReport())
  fs.writeFileSync('flow-result.json', JSON.stringify(await flow.createFlowResult(), null, 2))
}

captureReport()
