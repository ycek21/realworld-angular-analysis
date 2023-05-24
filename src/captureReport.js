import fs from 'fs'
import puppeteer from 'puppeteer'
import { startFlow } from 'lighthouse'

const browserConfig = {
  config: {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'desktop',
      screenEmulation: {
        mobile: false,
        width: 1340,
        height: 1080,
        deviceScaleFactor: 1.75,
        disabled: false
      },
      throttling: { cpuSlowdownMultiplier: 1, rttMs: 40, throughputKbps: 10240 }
    }
  }
}

export default async function captureReport (url, testVariant, index) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  // cold navigation
  const flow = await startFlow(page, browserConfig)
  await flow.navigate(url)

  await flow.navigate(url, {
    stepName: 'Warm navigation',
    configContext: {
      settingsOverrides: { disableStorageReset: true }
    }
  })

  await browser.close()

  const dirToSave = `X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse - automatic tests/${testVariant}/`

  if (!fs.existsSync(dirToSave)) {
    fs.mkdirSync(dirToSave, { recursive: true })
  }

  const htmlReportName = dirToSave + testVariant + '_' + index + '.html'
  const jsonReportName = dirToSave + testVariant + '_' + index + '.json'
  fs.writeFileSync(htmlReportName, await flow.generateReport())
  fs.writeFileSync(jsonReportName, JSON.stringify(await flow.createFlowResult(), null, 2))
}
