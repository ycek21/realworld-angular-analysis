import * as XLSX from 'xlsx'
import * as fs from 'fs'
import { Readable } from 'stream'
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs'

// TODO: add SSR after fixing it
const variants = [
  'initial_version',
  'preloading_disabled',
  'lazy_loading_disabled',
  'pwa'
]

function getCellForDataset (index) {
  switch (index) {
    case 0:
      return 'A1'
    case 1:
      return 'E1'
    case 2:
      return 'A25'
    case 3:
      return 'E25'
    case 4:
      return 'A48'
  }
}

function setConfig () {
  XLSX.set_fs(fs)
  XLSX.stream.set_readable(Readable)
  XLSX.set_cptable(cpexcel)
}

function expandCells (workBook) {
  const sheets = Object.values(workBook.Sheets)

  sheets.forEach((sheet) => {
    sheet['!cols'] = [{ wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }, { wch: '20' }]
  })
}

export default async function generateExcel (testedPage, rootDirectory) {
  setConfig()

  let workBook

  if (fs.existsSync(rootDirectory + '/real_world_results.xlsx')) {
    workBook = XLSX.readFile(rootDirectory + '/real_world_results.xlsx')
  } else {
    workBook = XLSX.utils.book_new()
  }

  const workSheet = XLSX.utils.aoa_to_sheet([])

  variants.forEach(async (variant, index) => {
    const fileDir = rootDirectory + `/${variant}_${testedPage}/${variant}_${testedPage}_calculated_results.json`

    const file = await fs.readFileSync(fileDir)
    const fileAsJson = JSON.parse(file)

    XLSX.utils.sheet_add_aoa(workSheet, [
      [variant, '', ''],
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

    ], { origin: getCellForDataset(index) })

    if (index === (variants.length - 1)) {
      XLSX.utils.book_append_sheet(workBook, workSheet, testedPage)
      expandCells(workBook)

      XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })
      XLSX.writeFile(workBook, rootDirectory + '/real_world_results.xlsx')
    }
  }
  )
}
