import fs from 'fs'
import puppeteer from 'puppeteer'
import { startFlow } from 'lighthouse'
import { saveResultsInJson } from './saveResults.js'

const browserConfig = {
  config: {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'desktop',
      screenEmulation: {
        disabled: true
      },
      throttlingMethod: 'provided'
    }
  }
}

const browserSize = { width: 1920, height: 1080 }

export default async function captureReport (url, testVariant, count) {
  const browser = await puppeteer.launch({ headless: false, args: [`--window-size=${browserSize.width},${browserSize.height}`] })
  const incognito = await browser.createIncognitoBrowserContext()
  const page = await incognito.newPage()

  await page.setViewport({
    width: browserSize.width,
    height: browserSize.height,
    deviceScaleFactor: 1
  })

  let index = 0

  for (index; index < count; index++) {
    // cold navigation
    const flow = await startFlow(page, browserConfig)
    await flow.navigate(url, {
      stepName: 'Cold navigation',
      configContext: {
        settingsOverrides: { disableStorageReset: false }
      }
    })

    await flow.navigate(url, {
      stepName: 'Warm navigation',
      configContext: {
        settingsOverrides: { disableStorageReset: true }
      }
    })

    const dirToSave = `X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse - automatic tests/${testVariant}/`

    if (!fs.existsSync(dirToSave)) {
      fs.mkdirSync(dirToSave, { recursive: true })
    }

    const htmlReportName = dirToSave + testVariant + '_' + index + '.html'
    const jsonReportName = dirToSave + testVariant + '_' + index + '.json'
    fs.writeFileSync(htmlReportName, await flow.generateReport())
    fs.writeFileSync(jsonReportName, JSON.stringify(await flow.createFlowResult(), null, 2))

    saveResultsInJson(testVariant, index)
  }

  await browser.close()
}
