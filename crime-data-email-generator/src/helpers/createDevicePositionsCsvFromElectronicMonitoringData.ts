import { ElectronicMonitoringData } from '../fixtures/electronic-monitoring/createElectronicMonitoringData'
import { toAthenaTimestamp } from './formatters'

const columns = [
  'client_id',
  'device_id',
  'location_id',
  'person_id',
  'position_circulation_id',
  'position_direction',
  'position_geometry',
  'position_gps_date',
  'position_hdop',
  'position_id',
  'position_latitude',
  'position_lbs',
  'position_longitude',
  'position_precision',
  'position_recorded_date',
  'position_satellite',
  'position_speed',
  'position_uploaded_date',
].join(',')

const createDevicePositionsCSVFromElectronicMonitoringData = (data: ElectronicMonitoringData): string => {
  const positions = data.deviceWearers.flatMap(deviceWearer =>
    deviceWearer.deviceActivations.flatMap(activation => activation.positions),
  )

  return [
    columns,
    ...positions.map(position =>
      [
        '',
        position.deviceId,
        position.id,
        position.personId,
        '',
        position.direction,
        '',
        toAthenaTimestamp(position.timestamp),
        '',
        position.id,
        position.latitude,
        position.geolocationMechanism,
        position.longitude,
        position.precision,
        toAthenaTimestamp(position.timestamp),
        '',
        position.speed,
        '',
      ].join(','),
    ),
  ].join('\n')
}

export default createDevicePositionsCSVFromElectronicMonitoringData
