import { stringify } from 'csv-stringify/sync'
import { ElectronicMonitoringData } from '../fixtures/electronic-monitoring/createElectronicMonitoringData'
import { toAthenaTimestamp } from './formatters'

const columns = [
  'position_id',
  'person_id',
  'device_id',
  'position_gps_date',
  'position_recorded_date',
  'position_uploaded_date',
  'position_speed',
  'position_satellite',
  'position_direction',
  'position_precision',
  'position_lbs',
  'position_hdop',
  'position_geometry',
  'position_latitude',
  'position_longitude',
  'client_id',
  'location_id',
  '_file_name',
  '_feed_type',
  '_delivery_date',
  'position_circulation_id',
  '_source_bucket',
  '_source_key',
  '_source_etag',
  '__datetime_added'
]

const createDevicePositionsCSVFromElectronicMonitoringData = (data: ElectronicMonitoringData): string => {
  const positions = data.deviceWearers.flatMap(deviceWearer =>
    deviceWearer.deviceActivations.flatMap(activation => activation.positions),
  )

  return stringify([
    columns,
    ...positions.map(position => [
      position.id,
      position.personId,
      position.deviceId,
      '', // position_gps_date,
      toAthenaTimestamp(position.timestamp), // position_recorded_date,
      '', // position_uploaded_date,
      position.speed,
      '', // position_satellite,
      position.direction,
      position.precision,
      position.geolocationMechanism, // position_lbs,
      '', // position_hdop,
      '', // position_geometry,
      position.latitude,
      position.longitude,
      '', // client_id,
      '', // location_id,
      '', // _file_name,
      '', // _feed_type,
      '', // _delivery_date,
      '', // position_circulation_id,
      '', // _source_bucket,
      '', // _source_key,
      '', // _source_etag,
      toAthenaTimestamp(new Date(Date.now())), // __datetime_added
    ]),
  ])
}

export default createDevicePositionsCSVFromElectronicMonitoringData
