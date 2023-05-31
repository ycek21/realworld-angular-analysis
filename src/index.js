import captureReport from './captureReport.js'
import { calculateMetrics } from './saveResults.js'
import generateExcel from './generateExcel.js'

async function generateReports (version, count) {
  const dirToSave = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse_no_throttling'
  await captureReport('http://localhost:4200/article/Try-to-transmit-the-HTTP-card-maybe-it-will-override-the-multi-byte-hard-drive!-120863', version, count, dirToSave)
  await calculateMetrics(version, dirToSave)
}

async function toExcel (version) {
  const dirToSave = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse_no_throttling'

  await generateExcel(version, dirToSave)
}

generateReports('pwa_profile_test', 10)
// toExcel('profile')
