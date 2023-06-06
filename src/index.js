import captureReport from './captureReport.js'
import { calculateMetrics } from './saveResults.js'
import generateExcel from './generateExcel.js'

async function generateReports (version, count) {
  const dirToSave = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse_no_throttling_await_all'
  await captureReport('http://localhost:4200/profile/Anah%20Bene%C5%A1ov%C3%A1', version, count, dirToSave)
  await calculateMetrics(version, dirToSave)
}

async function toExcel (version) {
  const dirToSave = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse_no_throttling_await_all'

  generateExcel(version, dirToSave)
}

generateReports('initial_version_profile', 10)
// toExcel('home')
