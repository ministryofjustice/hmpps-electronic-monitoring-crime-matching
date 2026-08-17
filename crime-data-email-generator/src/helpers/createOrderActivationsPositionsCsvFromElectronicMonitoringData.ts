import { stringify } from 'csv-stringify/sync'
import { ElectronicMonitoringData } from '../fixtures/electronic-monitoring/createElectronicMonitoringData'
import { toAthenaDate, toAthenaTimestamp } from './formatters'

const columns = [
  'grouped_date',
  'unique_device_wearer_id',
  'first_name',
  'last_name',
  'date_of_birth',
  'house_number_and_street_name',
  'city_or_town',
  'county',
  'country',
  'postcode',
  'nomis_id',
  'pnc_id',
  'mdss_person_id',
  'order_id',
  'order_start_date',
  'order_commencement_date',
  'order_end_date',
  'order_type',
  'order_type_description',
  'order_type_detail',
  'responsible_organisation',
  'responsible_officer_name',
  'is_monitored',
  'caseload__datetime_added',
  'device_activation_id',
  'device_activation_date',
  'device_deactivation_date',
  'person_id',
  'device_id',
  'device_serial_number',
  'device_activations__datetime_added',
  'client_id',
  'location_id',
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
]

const createOrderActivationsPositionsCsvFromElectronicMonitoringData = (data: ElectronicMonitoringData): string => {
  return stringify([
    columns,
    ...data.deviceWearers.flatMap(deviceWearer =>
      deviceWearer.deviceActivations.flatMap(activation =>
        activation.positions.map(position => [
          '', // grouped_date
          deviceWearer.uniqueDeviceWearerId, // unique_device_wearer_id
          deviceWearer.firstName, // first_name
          deviceWearer.lastName, // last_name
          toAthenaDate(deviceWearer.dateOfBirth), // date_of_birth
          deviceWearer.houseNumberAndStreetName, // house_number_and_street_name
          deviceWearer.cityOrTown, // city_or_town
          '', // county
          '', // country
          deviceWearer.postcode, // postcode
          deviceWearer.nomisId, // nomis_id
          deviceWearer.pncId, // pnc_id
          deviceWearer.mdssPersonId, // mdss_person_id
          '', // order_id
          '', // order_start_date
          '', // order_commencement_date
          '', // order_end_date
          '', // order_type
          '', // order_type_description
          '', // order_type_detail
          '', // responsible_organisation
          deviceWearer.responsibleOfficerName, // responsible_officer_name
          '', // is_monitored
          '', // caseload__datetime_added
          activation.device_activation_id, // device_activation_id
          toAthenaTimestamp(activation.device_activation_date), // device_activation_date
          toAthenaTimestamp(activation.device_deactivation_date), // device_deactivation_date
          activation.personId, // person_id
          activation.device_id, // device_id
          activation.device_serial_number, // device_serial_number
          '', // device_activations__datetime_added
          '', // client_id
          position.id, // location_id
          '', // position_circulation_id
          position.direction, // position_direction
          '', // position_geometry
          toAthenaTimestamp(position.timestamp), // position_gps_date
          '', // position_hdop
          position.id, // position_id
          position.latitude, // position_latitude
          position.geolocationMechanism, // position_lbs
          position.longitude, // position_longitude
          position.precision, // position_precision
          toAthenaTimestamp(position.timestamp), // position_recorded_date
          '', // position_satellite
          position.speed, // position_speed
          '', // position_uploaded_date
        ]),
      ),
    ),
  ])
}

export default createOrderActivationsPositionsCsvFromElectronicMonitoringData
