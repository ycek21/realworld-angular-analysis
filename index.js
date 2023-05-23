import fs from 'fs'
import puppeteer from 'puppeteer'
import { startFlow } from 'lighthouse'

async function captureReport () {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  const flow = await startFlow(page,

    {
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
    })
  await flow.navigate('http://localhost:4200')

  await browser.close()
  fs.writeFileSync('report.html', await flow.generateReport())
  fs.writeFileSync('flow-result.json', JSON.stringify(await flow.createFlowResult(), null, 2))
}

captureReport()

async function saveResultsInJson (testVariant) {
  const defaultDir = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse - automatic tests'
  const dirToSave = defaultDir + `/${testVariant}`

  if (!fs.existsSync(dirToSave)) {
    fs.mkdirSync(dirToSave, { recursive: true })
  }



  const 

  const dataToSave = JSON.stringify(student)
  const fileDir = dirToSave + '/deployed_1.json'

  if (fs.existsSync(fileDir)) {
    console.log('jacek :>> ')
  } else {
    const dataToSave = {
      'first-contentful-paint': [],
      "largest-contentful-paint": [],
      "speed-index": [],
      "total-blocking-time": [],
      "cumulative-layout-shift": [],
      "performance": [],
      "accessibility": [],
      "best-practices": [],
      "seo": [],
      "pwa": []
    }

    fs.writeFileSync(fileDir, dataToSave)
  }
}

saveResultsInJson('initial-version')
