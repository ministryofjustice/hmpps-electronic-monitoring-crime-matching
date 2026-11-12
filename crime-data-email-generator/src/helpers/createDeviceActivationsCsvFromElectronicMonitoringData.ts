import { stringify } from 'csv-stringify/sync'
import { ElectronicMonitoringData } from '../fixtures/electronic-monitoring/createElectronicMonitoringData'
import { toAthenaTimestamp } from './formatters'

const columns = [
  'device_activation_id',
  'device_activation_date',
  'device_deactivation_date',
  'is_device_activation_open',
  'is_device_deactivation_date_imputed',
  'person_id',
  'device_id',
  'device_serial_number',
  'device_model_name',
  '__datetime_added'
]

const createDeviceActivationsCsvFromElectronicMonitoringData = (data: ElectronicMonitoringData): string => {
  const activations = data.deviceWearers.flatMap(deviceWearer => deviceWearer.deviceActivations)

  return stringify([
    columns,
    ...activations.map(activation => [
      activation.device_activation_id,
      toAthenaTimestamp(activation.device_activation_date),
      toAthenaTimestamp(activation.device_deactivation_date),
      true, // is_device_activation_open
      false, // is_device_deactivation_date_imputed
      activation.personId,
      activation.device_id,
      activation.device_serial_number,
      '', // device_model_name
      toAthenaTimestamp(new Date(Date.now())), // __datetime_added
    ]),
  ])
}

export default createDeviceActivationsCsvFromElectronicMonitoringData
