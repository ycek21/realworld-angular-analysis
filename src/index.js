import captureReport from './captureReport.js'
import { calculateMetrics } from './saveResults.js'
import generateExcel from './generateExcel.js'

async function generateReports (version, count) {
  const dirToSave = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse_no_throttling'
  await captureReport('http://localhost:4200', version, count, dirToSave)
  await calculateMetrics(version, dirToSave)
}

async function toExcel (version) {
  const dirToSave = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse_no_throttling'

  await generateExcel(version, dirToSave)
}

// generateReports('pwa_home', 10)
toExcel('home')
