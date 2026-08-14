import { stringify } from 'csv-stringify/sync'
import { ElectronicMonitoringData } from '../fixtures/electronic-monitoring/createElectronicMonitoringData'
import { toAthenaTimestamp } from './formatters'

const columns = [
  'device_activation_id',
  'device_activation_date',
  'device_deactivation_date',
  'person_id',
  'device_id',
  'device_serial_number',
]

const createDeviceActivationsCsvFromElectronicMonitoringData = (data: ElectronicMonitoringData): string => {
  const activations = data.deviceWearers.flatMap(deviceWearer => deviceWearer.deviceActivations)

  return stringify([
    columns,
    ...activations.map(activation => [
      activation.device_activation_id,
      toAthenaTimestamp(activation.device_activation_date),
      toAthenaTimestamp(activation.device_deactivation_date),
      activation.personId,
      activation.device_id,
      activation.device_serial_number,
    ]),
  ])
}

export default createDeviceActivationsCsvFromElectronicMonitoringData
