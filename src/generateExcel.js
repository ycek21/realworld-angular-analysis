import * as XLSX from 'xlsx'

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs'

/* load 'stream' for stream support */
import { Readable } from 'stream'

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs'

export default async function generateExcel (testVariant) {
  const dirToSave = `X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse - automatic tests/${testVariant}/`
  const fileDir = 'X:/iCloudDrive/Studies/Studia_magisterskie/Praca magisterksa/Lighthouse - automatic tests/metrics_test_logged/metrics_test_logged_calculated_results.json'

  XLSX.set_fs(fs)
  XLSX.stream.set_readable(Readable)
  XLSX.set_cptable(cpexcel)

  const file = await fs.readFileSync(fileDir)
  const fileAsJson = JSON.parse(file)

  console.log('fileAsJson :>> ', fileAsJson)

  const worksheet = XLSX.utils.aoa_to_sheet([
    ['Initial Version - lazy loading and preloading enabled', '', ''],
    ['', 'Cold load', 'Warm load'],
    ['First contentful Paint', fileAsJson['cold-load']['first-contentful-paint'].average, fileAsJson['warm-load']['first-contentful-paint'].average],
    ['Mediana', fileAsJson['cold-load']['first-contentful-paint'].median, fileAsJson['warm-load']['first-contentful-paint'].median],

    ['Largest contentful paint', fileAsJson['cold-load']['largest-contentful-paint'].average, fileAsJson['warm-load']['largest-contentful-paint'].average],
    ['Mediana', fileAsJson['cold-load']['largest-contentful-paint'].median, fileAsJson['warm-load']['largest-contentful-paint'].median],

    ['Speed index', fileAsJson['cold-load']['speed-index'].average, fileAsJson['warm-load']['speed-index'].average],
    ['Mediana', fileAsJson['cold-load']['speed-index'].median, fileAsJson['warm-load']['speed-index'].median],

    ['Total blocking time', fileAsJson['cold-load']['total-blocking-time'].average, fileAsJson['warm-load']['total-blocking-time'].average],
    ['Mediana', fileAsJson['cold-load']['total-blocking-time'].median, fileAsJson['warm-load']['total-blocking-time'].median],

    ['cumulative-layout-shift', fileAsJson['cold-load']['cumulative-layout-shift'].average, fileAsJson['warm-load']['cumulative-layout-shift'].average],
    ['Mediana', fileAsJson['cold-load']['cumulative-layout-shift'].median, fileAsJson['warm-load']['cumulative-layout-shift'].median],

    ['dom-content-loaded', fileAsJson['cold-load']['dom-content-loaded'].average, fileAsJson['warm-load']['dom-content-loaded'].average],
    ['Mediana', fileAsJson['cold-load']['dom-content-loaded'].median, fileAsJson['warm-load']['dom-content-loaded'].median],

    ['load', fileAsJson['cold-load'].load.average, fileAsJson['warm-load'].load.average],
    ['Mediana', fileAsJson['cold-load'].load.median, fileAsJson['warm-load'].load.median],

    ['Performance', fileAsJson['cold-load'].performance, fileAsJson['warm-load'].performance],
    ['Accessibility', fileAsJson['cold-load'].accessibility, fileAsJson['warm-load'].accessibility],
    ['best-practices', fileAsJson['cold-load']['best-practices'], fileAsJson['warm-load']['best-practices']],
    ['seo', fileAsJson['cold-load'].seo, fileAsJson['warm-load'].seo]

  ]
  )

  XLSX.utils.sheet_add_aoa(worksheet, [
    ['Initial', 'Version', 'lazy loading and preloading enabled'],
    ['', 'Cold load', 'Warm load'],
    ['First contentful Paint', fileAsJson['cold-load']['first-contentful-paint'].average, fileAsJson['warm-load']['first-contentful-paint'].average],
    ['Mediana', fileAsJson['cold-load']['first-contentful-paint'].median, fileAsJson['warm-load']['first-contentful-paint'].median],

    ['Largest contentful paint', fileAsJson['cold-load']['largest-contentful-paint'].average, fileAsJson['warm-load']['largest-contentful-paint'].average],
    ['Mediana', fileAsJson['cold-load']['largest-contentful-paint'].median, fileAsJson['warm-load']['largest-contentful-paint'].median],

    ['Speed index', fileAsJson['cold-load']['speed-index'].average, fileAsJson['warm-load']['speed-index'].average],
    ['Mediana', fileAsJson['cold-load']['speed-index'].median, fileAsJson['warm-load']['speed-index'].median],

    ['Total blocking time', fileAsJson['cold-load']['total-blocking-time'].average, fileAsJson['warm-load']['total-blocking-time'].average],
    ['Mediana', fileAsJson['cold-load']['total-blocking-time'].median, fileAsJson['warm-load']['total-blocking-time'].median],

    ['cumulative-layout-shift', fileAsJson['cold-load']['cumulative-layout-shift'].average, fileAsJson['warm-load']['cumulative-layout-shift'].average],
    ['Mediana', fileAsJson['cold-load']['cumulative-layout-shift'].median, fileAsJson['warm-load']['cumulative-layout-shift'].median],

    ['dom-content-loaded', fileAsJson['cold-load']['dom-content-loaded'].average, fileAsJson['warm-load']['dom-content-loaded'].average],
    ['Mediana', fileAsJson['cold-load']['dom-content-loaded'].median, fileAsJson['warm-load']['dom-content-loaded'].median],

    ['load', fileAsJson['cold-load'].load.average, fileAsJson['warm-load'].load.average],
    ['Mediana', fileAsJson['cold-load'].load.median, fileAsJson['warm-load'].load.median],

    ['Performance', fileAsJson['cold-load'].performance, fileAsJson['warm-load'].performance],
    ['Accessibility', fileAsJson['cold-load'].accessibility, fileAsJson['warm-load'].accessibility],
    ['best-practices', fileAsJson['cold-load']['best-practices'], fileAsJson['warm-load']['best-practices']],
    ['seo', fileAsJson['cold-load'].seo, fileAsJson['warm-load'].seo]

  ], { origin: 'E1' })

  XLSX.utils.sheet_add_aoa(worksheet, [
    ['Initial Version - lazy loading and preloading enabled', '', ''],
    ['', 'Cold load', 'Warm load'],
    ['First contentful Paint', fileAsJson['cold-load']['first-contentful-paint'].average, fileAsJson['warm-load']['first-contentful-paint'].average],
    ['Mediana', fileAsJson['cold-load']['first-contentful-paint'].median, fileAsJson['warm-load']['first-contentful-paint'].median],

    ['Largest contentful paint', fileAsJson['cold-load']['largest-contentful-paint'].average, fileAsJson['warm-load']['largest-contentful-paint'].average],
    ['Mediana', fileAsJson['cold-load']['largest-contentful-paint'].median, fileAsJson['warm-load']['largest-contentful-paint'].median],

    ['Speed index', fileAsJson['cold-load']['speed-index'].average, fileAsJson['warm-load']['speed-index'].average],
    ['Mediana', fileAsJson['cold-load']['speed-index'].median, fileAsJson['warm-load']['speed-index'].median],

    ['Total blocking time', fileAsJson['cold-load']['total-blocking-time'].average, fileAsJson['warm-load']['total-blocking-time'].average],
    ['Mediana', fileAsJson['cold-load']['total-blocking-time'].median, fileAsJson['warm-load']['total-blocking-time'].median],

    ['cumulative-layout-shift', fileAsJson['cold-load']['cumulative-layout-shift'].average, fileAsJson['warm-load']['cumulative-layout-shift'].average],
    ['Mediana', fileAsJson['cold-load']['cumulative-layout-shift'].median, fileAsJson['warm-load']['cumulative-layout-shift'].median],

    ['dom-content-loaded', fileAsJson['cold-load']['dom-content-loaded'].average, fileAsJson['warm-load']['dom-content-loaded'].average],
    ['Mediana', fileAsJson['cold-load']['dom-content-loaded'].median, fileAsJson['warm-load']['dom-content-loaded'].median],

    ['load', fileAsJson['cold-load'].load.average, fileAsJson['warm-load'].load.average],
    ['Mediana', fileAsJson['cold-load'].load.median, fileAsJson['warm-load'].load.median],

    ['Performance', fileAsJson['cold-load'].performance, fileAsJson['warm-load'].performance],
    ['Accessibility', fileAsJson['cold-load'].accessibility, fileAsJson['warm-load'].accessibility],
    ['best-practices', fileAsJson['cold-load']['best-practices'], fileAsJson['warm-load']['best-practices']],
    ['seo', fileAsJson['cold-load'].seo, fileAsJson['warm-load'].seo]

  ], { origin: 'A25' })

  const workBook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workBook, worksheet, 'test')

  console.log('worksheet[xd] :>> ', worksheet['!cols'])

  worksheet['!cols'] = [{ wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }]

  XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })

  XLSX.writeFile(workBook, 'xd.xlsx')
}
