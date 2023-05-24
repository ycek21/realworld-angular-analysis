import fs from 'fs'

const defaultDir = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse - automatic tests'

export async function saveResultsInJson (testVariant, index) {
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

export async function calculateMetrics (testVariant) {
  const aggregatedFileLocation = defaultDir + `/${testVariant}/${testVariant}_aggregated_results.json`
  const jsonRawAggregatedData = fs.readFileSync(aggregatedFileLocation)
  const jsonToReadFrom = JSON.parse(jsonRawAggregatedData)

  const results = {
    'cold-load': {
      'first-contentful-paint': {
        average: calculateAverage(jsonToReadFrom['cold-load']['first-contentful-paint'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['cold-load']['first-contentful-paint'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['cold-load']['first-contentful-paint'][0].numericUnit
      },
      'largest-contentful-paint': {
        average: calculateAverage(jsonToReadFrom['cold-load']['largest-contentful-paint'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['cold-load']['largest-contentful-paint'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['cold-load']['largest-contentful-paint'][0].numericUnit
      },
      'speed-index': {
        average: calculateAverage(jsonToReadFrom['cold-load']['speed-index'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['cold-load']['speed-index'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['cold-load']['speed-index'][0].numericUnit
      },
      'total-blocking-time': {
        average: calculateAverage(jsonToReadFrom['cold-load']['total-blocking-time'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['cold-load']['total-blocking-time'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['cold-load']['total-blocking-time'][0].numericUnit
      },
      'cumulative-layout-shift': {
        average: calculateAverage(jsonToReadFrom['cold-load']['cumulative-layout-shift'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['cold-load']['cumulative-layout-shift'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['cold-load']['cumulative-layout-shift'][0].numericUnit
      },
      performance: calculateAverage(jsonToReadFrom['cold-load'].performance),
      accessibility: calculateAverage(jsonToReadFrom['cold-load'].accessibility),
      'best-practices': calculateAverage(jsonToReadFrom['cold-load']['best-practices']),
      seo: calculateAverage(jsonToReadFrom['cold-load'].seo),
      pwa: calculateAverage(jsonToReadFrom['cold-load'].pwa)
    },
    'warm-load': {
      'first-contentful-paint': {
        average: calculateAverage(jsonToReadFrom['warm-load']['first-contentful-paint'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['warm-load']['first-contentful-paint'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['warm-load']['first-contentful-paint'][1].numericUnit
      },
      'largest-contentful-paint': {
        average: calculateAverage(jsonToReadFrom['warm-load']['largest-contentful-paint'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['warm-load']['largest-contentful-paint'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['warm-load']['largest-contentful-paint'][1].numericUnit
      },
      'speed-index': {
        average: calculateAverage(jsonToReadFrom['warm-load']['speed-index'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['warm-load']['speed-index'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['warm-load']['speed-index'][1].numericUnit
      },
      'total-blocking-time': {
        average: calculateAverage(jsonToReadFrom['warm-load']['total-blocking-time'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['warm-load']['total-blocking-time'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['warm-load']['total-blocking-time'][1].numericUnit
      },
      'cumulative-layout-shift': {
        average: calculateAverage(jsonToReadFrom['warm-load']['cumulative-layout-shift'].map(x => x.numericValue)),
        median: calculateMedian(jsonToReadFrom['warm-load']['cumulative-layout-shift'].map(x => x.numericValue)),
        numericUnit: jsonToReadFrom['warm-load']['cumulative-layout-shift'][1].numericUnit
      },
      performance: calculateAverage(jsonToReadFrom['warm-load'].performance),
      accessibility: calculateAverage(jsonToReadFrom['warm-load'].accessibility),
      'best-practices': calculateAverage(jsonToReadFrom['warm-load']['best-practices']),
      seo: calculateAverage(jsonToReadFrom['warm-load'].seo),
      pwa: calculateAverage(jsonToReadFrom['warm-load'].pwa)
    }
  }

  saveCalculatedMetrics(testVariant, results)
}

function saveAggregatedJson (dirToSave, aggregatedData) {
  const jsonToSave = JSON.stringify(aggregatedData)

  fs.writeFileSync(dirToSave, jsonToSave)
}

function saveCalculatedMetrics (testVariant, results) {
  const aggregatedFileLocation = defaultDir + `/${testVariant}/${testVariant}_calculated_results.json`

  const json = JSON.stringify(results)
  fs.writeFileSync(aggregatedFileLocation, json)
}

function calculateAverage (metricArray) {
  let sum = 0
  const sumFunction = (a, b) => a + b

  metricArray.forEach((metric) => {
    sum = sumFunction(sum, metric)
  })

  return (sum / metricArray.length)
}

function calculateMedian (metricArray) {
  if (metricArray.length === 0) throw new Error('No inputs')

  metricArray.sort(function (a, b) {
    return a - b
  })

  const half = Math.floor(metricArray.length / 2)

  if (metricArray.length % 2) { return metricArray[half] }

  return (metricArray[half - 1] + metricArray[half]) / 2.0
}
