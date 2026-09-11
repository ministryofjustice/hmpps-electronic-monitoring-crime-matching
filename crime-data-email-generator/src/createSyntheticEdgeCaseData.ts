import createRandomBatchID from './fixtures/helpers/createRandomBatchId'
import createRandomCrimeAtLandmark from './fixtures/helpers/createRandomCrimeAtLandmark'
import createRandomPFA from './fixtures/helpers/createRandomPfa'
import createElectronicMonitoringEdgeCaseData from './fixtures/electronic-monitoring/createElectronicMonitoringEdgeCaseData'
import createCaseloadCsvFromElectronicMonitoringData from './helpers/createCaseloadCsvFromElectronicMonitoringData'
import createDeviceActivationsCsvFromElectronicMonitoringData from './helpers/createDeviceActivationsCsvFromElectronicMonitoringData'
import createDevicePositionsCsvFromElectronicMonitoringData from './helpers/createDevicePositionsCsvFromElectronicMonitoringData'
import createOrderActivationsPositionsCsvFromElectronicMonitoringData from './helpers/createOrderActivationsPositionsCsvFromElectronicMonitoringData'
import { createCsvFileFromBatch, createFile } from './helpers/fs'
import { CrimeBatch } from './types/batch'

const createSingleCrimeBatch = (): CrimeBatch => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crime = createRandomCrimeAtLandmark(pfa, batchId)

  return {
    name: 'batch-with-single-crime-edge-case-radius-crossings',
    crimes: [crime],
  }
}

const createSyntheticEdgeCaseData = () => {
  const batch = createSingleCrimeBatch()

  createCsvFileFromBatch(batch)

  const [crime] = batch.crimes
  if (crime.datum !== 'WGS84') {
    throw new Error('Expected a WGS84 crime in edge-case synthetic data generator')
  }

  const emData = createElectronicMonitoringEdgeCaseData(crime)

  createFile('positions.csv', createDevicePositionsCsvFromElectronicMonitoringData(emData))
  createFile('device_activations.csv', createDeviceActivationsCsvFromElectronicMonitoringData(emData))
  createFile('caseload.csv', createCaseloadCsvFromElectronicMonitoringData(emData))
  createFile('orders_activations_positions.csv', createOrderActivationsPositionsCsvFromElectronicMonitoringData(emData))
}

createSyntheticEdgeCaseData()