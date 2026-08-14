import { ElectronicMonitoringData } from '../fixtures/electronic-monitoring/createElectronicMonitoringData'
import { toAthenaDate } from './formatters'

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
].join(',')

const createCaseloadCsvFromElectronicMonitoringData = (data: ElectronicMonitoringData): string => {
  return [
    columns,
    ...data.deviceWearers.map(deviceWearer =>
      [
        '',
        deviceWearer.uniqueDeviceWearerId,
        deviceWearer.firstName,
        deviceWearer.lastName,
        toAthenaDate(deviceWearer.dateOfBirth),
        deviceWearer.houseNumberAndStreetName,
        deviceWearer.cityOrTown,
        '',
        '',
        deviceWearer.postcode,
        deviceWearer.nomisId,
        deviceWearer.pncId,
        deviceWearer.mdssPersonId,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        deviceWearer.responsibleOfficerName,
        '',
        '',
      ].join(','),
    ),
  ].join('\n')
}

export default createCaseloadCsvFromElectronicMonitoringData
