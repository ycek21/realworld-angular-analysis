import fs from 'fs'

const defaultDir = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse - automatic tests'

function saveAggregatedJson (dirToSave, aggregatedData) {
  const jsonToSave = JSON.stringify(aggregatedData)

  fs.writeFileSync(dirToSave, jsonToSave)
}

export default async function saveResultsInJson (testVariant, index) {
  const dirToSave = defaultDir + `/${testVariant}/`
  const auditJsonFileLocation = dirToSave + `${testVariant}_${index}.json`
  const jsonRawData = fs.readFileSync(auditJsonFileLocation)
  const json = JSON.parse(jsonRawData)

  const fileDir = dirToSave + `${testVariant}_aggregated_results.json`

  if (fs.existsSync(fileDir)) {
    const aggregatedJsonRawData = fs.readFileSync(fileDir)
    const aggregatedJson = JSON.parse(aggregatedJsonRawData)

    aggregatedJson['cold-load']['first-contentful-paint'].push(json.steps[0].lhr.audits['first-contentful-paint'])
    aggregatedJson['cold-load']['largest-contentful-paint'].push(json.steps[0].lhr.audits['largest-contentful-paint'])
    aggregatedJson['cold-load']['speed-index'].push(json.steps[0].lhr.audits['speed-index'])
    aggregatedJson['cold-load']['total-blocking-time'].push(json.steps[0].lhr.audits['total-blocking-time'])
    aggregatedJson['cold-load']['cumulative-layout-shift'].push(json.steps[0].lhr.audits['cumulative-layout-shift'])
    aggregatedJson['cold-load'].performance.push(json.steps[0].lhr.categories.performance.score)
    aggregatedJson['cold-load'].accessibility.push(json.steps[0].lhr.categories.accessibility.score)
    aggregatedJson['cold-load']['best-practices'].push(json.steps[0].lhr.categories['best-practices'].score)
    aggregatedJson['cold-load'].seo.push(json.steps[0].lhr.categories.seo.score)
    aggregatedJson['cold-load'].pwa.push(json.steps[0].lhr.categories.pwa.score)

    aggregatedJson['warm-load']['first-contentful-paint'].push(json.steps[1].lhr.audits['first-contentful-paint'])
    aggregatedJson['warm-load']['largest-contentful-paint'].push(json.steps[1].lhr.audits['largest-contentful-paint'])
    aggregatedJson['warm-load']['speed-index'].push(json.steps[1].lhr.audits['speed-index'])
    aggregatedJson['warm-load']['total-blocking-time'].push(json.steps[1].lhr.audits['total-blocking-time'])
    aggregatedJson['warm-load']['cumulative-layout-shift'].push(json.steps[1].lhr.audits['cumulative-layout-shift'])
    aggregatedJson['warm-load'].performance.push(json.steps[1].lhr.categories.performance.score)
    aggregatedJson['warm-load'].accessibility.push(json.steps[1].lhr.categories.accessibility.score)
    aggregatedJson['warm-load']['best-practices'].push(json.steps[1].lhr.categories['best-practices'].score)
    aggregatedJson['warm-load'].seo.push(json.steps[1].lhr.categories.seo.score)
    aggregatedJson['warm-load'].pwa.push(json.steps[1].lhr.categories.pwa.score)

    saveAggregatedJson(fileDir, aggregatedJson)
  } else {
    fs.mkdirSync(dirToSave, { recursive: true })

    const dataToSave = {
      'cold-load': {
        'first-contentful-paint': [json.steps[0].lhr.audits['first-contentful-paint']],
        'largest-contentful-paint': [json.steps[0].lhr.audits['largest-contentful-paint']],
        'speed-index': [json.steps[0].lhr.audits['speed-index']],
        'total-blocking-time': [json.steps[0].lhr.audits['total-blocking-time']],
        'cumulative-layout-shift': [json.steps[0].lhr.audits['cumulative-layout-shift']],
        performance: [json.steps[0].lhr.categories.performance.score],
        accessibility: [json.steps[0].lhr.categories.accessibility.score],
        'best-practices': [json.steps[0].lhr.categories['best-practices'].score],
        seo: [json.steps[0].lhr.categories.seo.score],
        pwa: [json.steps[0].lhr.categories.pwa.score]
      },
      'warm-load': {
        'first-contentful-paint': [json.steps[1].lhr.audits['first-contentful-paint']],
        'largest-contentful-paint': [json.steps[1].lhr.audits['largest-contentful-paint']],
        'speed-index': [json.steps[1].lhr.audits['speed-index']],
        'total-blocking-time': [json.steps[1].lhr.audits['total-blocking-time']],
        'cumulative-layout-shift': [json.steps[1].lhr.audits['cumulative-layout-shift']],
        performance: [json.steps[1].lhr.categories.performance.score],
        accessibility: [json.steps[1].lhr.categories.accessibility.score],
        'best-practices': [json.steps[1].lhr.categories['best-practices'].score],
        seo: [json.steps[1].lhr.categories.seo.score],
        pwa: [json.steps[1].lhr.categories.pwa.score]
      }

    }
    saveAggregatedJson(fileDir, dataToSave)
  }
}
