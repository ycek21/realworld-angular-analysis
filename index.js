import fs from 'fs'
import captureReport from './captureReport.js'
import { saveResultsInJson, calculateMetrics } from './saveResults.js'

// saveResultsInJson('initial_version', 1)

// captureReport('http://localhost:4200', 'initial_version', 3)

calculateMetrics('initial_version')
