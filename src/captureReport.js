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

  await page.setViewport(browserSize)

  const dirToSave = `X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse - automatic tests/${testVariant}/`

  if (!fs.existsSync(dirToSave)) {
    await fs.promises.mkdir(dirToSave, { recursive: true })
  }

  let index = 0

  for (index; index < count; index++) {
    // cold navigation
    const flow = await startFlow(page, browserConfig)
    await navigate(flow, url, 'Cold navigation', false)
    const coldLoad = await getPerformanceTimingData(page)

    // warm navigation
    await navigate(flow, url, 'Warm navigation', true)
    const warmLoad = await getPerformanceTimingData(page)

    const otherMetrics = {
      'cold-load': { ...coldLoad },
      'warm-load': { ...warmLoad }
    }

    const htmlReportName = `${dirToSave}${testVariant}_${index}.html`
    const jsonReportName = `${dirToSave}${testVariant}_${index}.json`

    await Promise.all([
      fs.promises.writeFile(htmlReportName, await flow.generateReport()),
      fs.promises.writeFile(jsonReportName, JSON.stringify(await flow.createFlowResult(), null, 2))
    ])

    await saveResultsInJson(testVariant, otherMetrics, index)
  }

  await browser.close()
}

async function navigate (flow, url, stepName, disableStorageReset) {
  await flow.navigate(url, {
    stepName,
    configContext: {
      settingsOverrides: { disableStorageReset }
    }
  })
}

async function getPerformanceTimingData (page) {
  const performanceTiming = await page.evaluate(() => {
    return JSON.stringify(window.performance.getEntriesByType('navigation'))
  })

  const timing = JSON.parse(performanceTiming)[0]
  const navigationStart = timing.startTime

  return extractDataFromPerformanceNavigationTiming(timing, navigationStart, 'domContentLoadedEventEnd', 'loadEventEnd')
}

function extractDataFromPerformanceNavigationTiming (timing, navigationStart, ...dataNames) {
  const extractedData = {}
  dataNames.forEach((name) => {
    extractedData[name] = timing[name] - navigationStart
  })

  return extractedData
}
