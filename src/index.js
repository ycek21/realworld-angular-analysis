import captureReport from './captureReport.js'
import { calculateMetrics } from './saveResults.js'
import generateExcel from './generateExcel.js'

async function generateReports (version, count) {
  await captureReport('http://localhost:4200', version, count)
  await calculateMetrics(version)
}

// generateReports('metrics_test_logged', 2)
generateExcel('jacek')
