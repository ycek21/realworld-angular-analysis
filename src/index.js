import captureReport from './captureReport.js'
import { saveResultsInJson, calculateMetrics } from './saveResults.js'

async function generateReports (version) {
  for (let index = 0; index < 10; index++) {
    await captureReport('http://localhost:4200', version, index)
    await saveResultsInJson(version, index)
  }

  calculateMetrics(version)
}

generateReports('initial_version_home_page')
