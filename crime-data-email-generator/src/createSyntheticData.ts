import createBatchWith100ValidCrimesAtLandmarks from './fixtures/batches/batch-with-100-valid-crimes-at-landmarks'
import { createCsvFileFromBatch, createFile } from './helpers/fs'
import createElectronicMonitoringData from './fixtures/electronic-monitoring/createElectronicMonitoringData'
import createDevicePositionsCsvFromElectronicMonitoringData from './helpers/createDevicePositionsCsvFromElectronicMonitoringData'
import createDeviceActivationsCsvFromElectronicMonitoringData from './helpers/createDeviceActivationsCsvFromElectronicMonitoringData'
import createCaseloadCsvFromElectronicMonitoringData from './helpers/createCaseloadCsvFromElectronicMonitoringData'

/**
 * Creates a fake batch of crimes and electronic monitoring data that will match to some crimes
 *
 * Generates 100 device wearers. Each device wearer has 1-3 device activations.
 * Each device activation has the chance to include position data that will match to a crime.
 * Because crimes are only generated at a small number of known locations this can result in
 * many device wearers matching to the same crime.
 *
 * The output files can be uploaded to Datastore test environment or the mock Datastore deployed to
 * Cloud Platform for E2E testing of the crime matching process.
 */
const createSyntheticData = async () => {
  // Generate a random batch
  const batch = createBatchWith100ValidCrimesAtLandmarks()

  // Write the csv file to disk
  createCsvFileFromBatch(batch)

  // Generate electronic monitoring data w/ some device wearers passing by crime locations
  const emData = await createElectronicMonitoringData(100, batch.crimes)

  // Write positions csv to disk
  createFile('positions.csv', createDevicePositionsCsvFromElectronicMonitoringData(emData))

  // Write device activations csv to disk
  createFile('device_activations.csv', createDeviceActivationsCsvFromElectronicMonitoringData(emData))

  // Write caseload csv to disk
  createFile('caseload.csv', createCaseloadCsvFromElectronicMonitoringData(emData))
}

createSyntheticData()
