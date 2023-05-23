import fs from 'fs'
import captureReport from './captureReport.js'

// async function saveResultsInJson (testVariant) {
//   const defaultDir = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse - automatic tests'
//   const dirToSave = defaultDir + `/${testVariant}`

//   if (!fs.existsSync(dirToSave)) {
//     fs.mkdirSync(dirToSave, { recursive: true })
//   }

//   const

//   const dataToSave = JSON.stringify(student)
//   const fileDir = dirToSave + '/deployed_1.json'

//   if (fs.existsSync(fileDir)) {
//     console.log('jacek :>> ')
//   } else {
//     const dataToSave = {
//       'first-contentful-paint': [],
//       "largest-contentful-paint": [],
//       "speed-index": [],
//       "total-blocking-time": [],
//       "cumulative-layout-shift": [],
//       "performance": [],
//       "accessibility": [],
//       "best-practices": [],
//       "seo": [],
//       "pwa": []
//     }

//     fs.writeFileSync(fileDir, dataToSave)
//   }
// }

// saveResultsInJson('initial-version')

captureReport('http://localhost:4200', 'initial_version', 3)
