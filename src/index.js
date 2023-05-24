import captureReport from './captureReport.js'
import { calculateMetrics } from './saveResults.js'

async function generateReports (version, count) {
  await captureReport('http://localhost:4200', version, count)

  calculateMetrics(version)
}

generateReports('pwa_home_one_browser', 5)
