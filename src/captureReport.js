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

async function * asyncGenerator (count) {
  let i = 0
  while (i < count) {
    yield i++
  }
}

export default async function captureReport (url, testVariant, count, rootDirectory) {
  const browser = await puppeteer.launch({ headless: false, args: [`--window-size=${browserSize.width},${browserSize.height}`] })
  const incognito = await browser.createIncognitoBrowserContext()
  const page = await incognito.newPage()

  await page.setViewport(browserSize)

  const dirToSave = rootDirectory + `/${testVariant}/`

  if (!fs.existsSync(dirToSave)) {
    await fs.promises.mkdir(dirToSave, { recursive: true })
  }

  for await (const index of asyncGenerator(count)) {
    const flow = await startFlow(page, browserConfig)
    // cold navigation
    // it's not possible to wrap this in Promise.all, because it throws error. Hence it needs to be executed sequentially
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

    const reports = await Promise.all([
      flow.generateReport(),
      flow.createFlowResult()
    ])

    await Promise.all([
      fs.promises.writeFile(htmlReportName, reports[0]),
      fs.promises.writeFile(jsonReportName, JSON.stringify(reports[1], null, 2)),
      saveResultsInJson(testVariant, reports[1], otherMetrics, rootDirectory)
    ])
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
