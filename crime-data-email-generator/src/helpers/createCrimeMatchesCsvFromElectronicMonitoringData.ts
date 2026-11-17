import { stringify } from 'csv-stringify/sync'
import { ElectronicMonitoringData } from '../fixtures/electronic-monitoring/createElectronicMonitoringData'

const columns = ['crime_reference', 'device_id', 'first_name']

const createCrimeMatchesCsvFromElectronicMonitoringData = (data: ElectronicMonitoringData): string =>
  stringify([
    columns,
    ...data.deviceWearers.flatMap(wearer =>
      wearer.deviceActivations
        .filter(activation => activation.matchedCrimeReference !== undefined)
        .map(activation => [activation.matchedCrimeReference, activation.device_id, wearer.firstName]),
    ),
  ])

export default createCrimeMatchesCsvFromElectronicMonitoringData
