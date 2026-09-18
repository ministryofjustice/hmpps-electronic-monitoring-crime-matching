import createElectronicMonitoringEdgeCaseData from './fixtures/electronic-monitoring/createElectronicMonitoringEdgeCaseData'
import createCaseloadCsvFromElectronicMonitoringData from './helpers/createCaseloadCsvFromElectronicMonitoringData'
import createDeviceActivationsCsvFromElectronicMonitoringData from './helpers/createDeviceActivationsCsvFromElectronicMonitoringData'
import createDevicePositionsCsvFromElectronicMonitoringData from './helpers/createDevicePositionsCsvFromElectronicMonitoringData'
import createOrderActivationsPositionsCsvFromElectronicMonitoringData from './helpers/createOrderActivationsPositionsCsvFromElectronicMonitoringData'
import { createCsvFileFromBatch, createFile } from './helpers/fs'
import createBatchWithCrimeWithMatches from './fixtures/batches/batch-with-crime-with-matches'

const createSyntheticEdgeCaseData = () => {
  const batch = createBatchWithCrimeWithMatches()

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
