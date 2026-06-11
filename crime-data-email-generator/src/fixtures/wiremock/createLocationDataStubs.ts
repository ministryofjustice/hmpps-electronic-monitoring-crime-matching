import faker from '../../faker'
import DeviceActivation from '../../types/deviceActivation'
import DeviceWearer from '../../types/deviceWearer'
import { ElectronicMonitoringData } from '../electronic-monitoring/createElectronicMonitoringData'
import { formatAthenaTimestamp, formatDateOfBirth } from '../helpers/formatDate'
import createAthenaGetQueryExecutionMapping from './createAthenaGetQueryExecutionMapping'
import createAthenaGetQueryResultsMapping from './createAthenaGetQueryResultsMapping'
import createAthenaStartQueryExecutionMapping from './createAthenaStartQueryExecutionMapping'
import createAthenaGetWorkGroupMapping from './createAthenaWorkgroupMapping'

const findPersonByNameQuery = 'WHERE ( caseload.first_name LIKE ? OR caseload.last_name LIKE ? )'
const findPersonByPersonIdQuery = 'WHERE caseload.unique_device_wearer_id = ?'
const findDeviceActivationByIdQuery = 'WHERE device_activations.device_activation_id = ?'
const findPositionsQuery =
  'WHERE ( device_activations.device_activation_id = ? AND position.position_lbs = ? AND position.position_recorded_date >= from_iso8601_timestamp(?) AND position.position_recorded_date <= from_iso8601_timestamp(?) )'

const withWildcards = (parameter: string) => `%${parameter}%`
const withQuotes = (parameter: string) => `'${parameter}'`

const createEmptyResultStubs = (query: string) => {
  // No execution params equals no request bodyPatterns matchers so should match every request
  const executionParams: Array<Array<string>> = []
  // Higher number equals lower priority so other mappings should match first
  const priority = 1000
  const executionId = faker.string.uuid()

  return [
    createAthenaStartQueryExecutionMapping(executionId, query, [], priority),
    createAthenaGetQueryExecutionMapping(executionId),
    createAthenaGetQueryResultsMapping(
      executionId,
      [
        // TODO: We should reuse this column set for all empty queries (even if it works)
        { name: 'unique_device_wearer_id', type: 'varchar' },
        { name: 'first_name', type: 'varchar' },
        { name: 'last_name', type: 'varchar' },
        { name: 'nomis_id', type: 'bigint' },
        { name: 'pnc_id', type: 'varchar' },
        { name: 'date_of_birth', type: 'date' },
        { name: 'responsible_officer_name', type: 'varchar' },
        { name: 'postcode', type: 'varchar' },
        { name: 'city_or_town', type: 'varchar' },
        { name: 'house_number_and_street_name', type: 'varchar' },
        { name: 'device_id', type: 'bigint' },
        { name: 'person_id', type: 'bigint' },
        { name: 'device_activation_id', type: 'bigint' },
        { name: 'device_activation_date', type: 'timestamp' },
        { name: 'device_deactivation_date', type: 'timestamp' },
      ],
      executionParams,
    ),
  ]
}

const createFindPersonByNameQueryStubs = (deviceWearer: DeviceWearer) => {
  const executionId = faker.string.uuid()

  return [
    // Find person by name
    createAthenaStartQueryExecutionMapping(executionId, findPersonByNameQuery, [
      withQuotes(withWildcards(deviceWearer.firstName)),
    ]),
    createAthenaGetQueryExecutionMapping(executionId),
    createAthenaGetQueryResultsMapping(
      executionId,
      [
        { name: 'unique_device_wearer_id', type: 'varchar' },
        { name: 'first_name', type: 'varchar' },
        { name: 'last_name', type: 'varchar' },
        { name: 'nomis_id', type: 'bigint' },
        { name: 'pnc_id', type: 'varchar' },
        { name: 'date_of_birth', type: 'date' },
        { name: 'responsible_officer_name', type: 'varchar' },
        { name: 'postcode', type: 'varchar' },
        { name: 'city_or_town', type: 'varchar' },
        { name: 'house_number_and_street_name', type: 'varchar' },
        { name: 'device_id', type: 'bigint' },
        { name: 'device_activation_id', type: 'bigint' },
        { name: 'device_activation_date', type: 'timestamp' },
        { name: 'device_deactivation_date', type: 'timestamp' },
      ],
      [
        ...deviceWearer.deviceActivations.map(deviceActivation => [
          deviceWearer.uniqueDeviceWearerId,
          deviceWearer.firstName,
          deviceWearer.lastName,
          deviceWearer.nomisId,
          deviceWearer.pncId,
          formatDateOfBirth(deviceWearer.dateOfBirth),
          deviceWearer.responsibleOfficerName,
          deviceWearer.postcode,
          deviceWearer.cityOrTown,
          deviceWearer.houseNumberAndStreetName,
          deviceActivation.device_id.toString(),
          deviceActivation.device_activation_id.toString(),
          formatAthenaTimestamp(deviceActivation.device_activation_date),
          formatAthenaTimestamp(deviceActivation.device_deactivation_date),
        ]),
      ],
    ),
  ]
}

const createFindPersonByPersonIdQueryStubs = (deviceWearer: DeviceWearer) => {
  const executionId = faker.string.uuid()

  return [
    // Find person by name
    createAthenaStartQueryExecutionMapping(executionId, findPersonByPersonIdQuery, [
      withQuotes(deviceWearer.uniqueDeviceWearerId),
    ]),
    createAthenaGetQueryExecutionMapping(executionId),
    createAthenaGetQueryResultsMapping(
      executionId,
      [
        { name: 'unique_device_wearer_id', type: 'varchar' },
        { name: 'first_name', type: 'varchar' },
        { name: 'last_name', type: 'varchar' },
        { name: 'nomis_id', type: 'bigint' },
        { name: 'pnc_id', type: 'varchar' },
        { name: 'date_of_birth', type: 'date' },
        { name: 'responsible_officer_name', type: 'varchar' },
        { name: 'postcode', type: 'varchar' },
        { name: 'city_or_town', type: 'varchar' },
        { name: 'house_number_and_street_name', type: 'varchar' },
      ],
      [
        [
          deviceWearer.uniqueDeviceWearerId,
          deviceWearer.firstName,
          deviceWearer.lastName,
          deviceWearer.nomisId,
          deviceWearer.pncId,
          formatDateOfBirth(deviceWearer.dateOfBirth),
          deviceWearer.responsibleOfficerName,
          deviceWearer.postcode,
          deviceWearer.cityOrTown,
          deviceWearer.houseNumberAndStreetName,
        ],
      ],
    ),
  ]
}

const createFindDeviceActivationByIdQueryStubs = (deviceWearerId: string, deviceActivation: DeviceActivation) => {
  const executionId = faker.string.uuid()

  return [
    createAthenaStartQueryExecutionMapping(executionId, findDeviceActivationByIdQuery, [
      deviceActivation.device_activation_id.toString(),
    ]),
    createAthenaGetQueryExecutionMapping(executionId),
    createAthenaGetQueryResultsMapping(
      executionId,
      [
        { name: 'device_activation_id', type: 'varchar' },
        { name: 'device_id', type: 'varchar' },
        { name: 'person_id', type: 'varchar' },
        { name: 'device_activation_date', type: 'bigint' },
        { name: 'device_deactivation_date', type: 'varchar' },
      ],
      [
        [
          deviceActivation.device_activation_id.toString(),
          deviceActivation.device_id.toString(),
          deviceWearerId,
          formatAthenaTimestamp(deviceActivation.device_activation_date),
          formatAthenaTimestamp(deviceActivation.device_deactivation_date),
        ],
      ],
    ),
  ]
}

const createFindPositionsQueryStubs = (deviceActivation: DeviceActivation) => {
  const executionId = faker.string.uuid()

  return [
    createAthenaStartQueryExecutionMapping(executionId, findPositionsQuery, [
      deviceActivation.device_activation_id.toString(),
    ]),
    createAthenaGetQueryExecutionMapping(executionId),
    createAthenaGetQueryResultsMapping(
      executionId,
      [
        { name: 'position_id', type: 'bigint' },
        { name: 'position_latitude', type: 'double' },
        { name: 'position_longitude', type: 'double' },
        { name: 'position_precision', type: 'bigint' },
        { name: 'position_speed', type: 'bigint' },
        { name: 'position_direction', type: 'bigint' },
        { name: 'position_recorded_date', type: 'timestamp' },
        { name: 'position_lbs', type: 'bigint' },
      ],
      [
        ...deviceActivation.positions.map(position => [
          position.id.toString(),
          position.latitude.toString(),
          position.longitude.toString(),
          position.precision.toString(),
          position.speed.toString(),
          position.direction.toString(),
          position.timestamp,
          position.geolocationMechanism.toString(),
        ]),
      ],
    ),
  ]
}

const createLocationDataQueryStubsForDeviceWearer = (deviceWearer: DeviceWearer) => {
  return [
    // Find person by name
    ...createFindPersonByNameQueryStubs(deviceWearer),

    // Find device activations by id
    ...deviceWearer.deviceActivations.flatMap(deviceActivation =>
      createFindDeviceActivationByIdQueryStubs(deviceWearer.uniqueDeviceWearerId, deviceActivation),
    ),

    // Find person by id
    ...createFindPersonByPersonIdQueryStubs(deviceWearer),

    // Find positions
    ...deviceWearer.deviceActivations.flatMap(createFindPositionsQueryStubs),
  ]
}

const createLocationDataStubs = (electronicMonitoringData: ElectronicMonitoringData) => {
  console.log(
    electronicMonitoringData.deviceWearers.map(
      deviceWearer => `Name: ${deviceWearer.firstName}, activations: ${deviceWearer.deviceActivations.length}`,
    ),
  )

  const mappings = [
    // Reusable stubs
    createAthenaGetWorkGroupMapping(),

    // Empty results stubs
    ...createEmptyResultStubs(findPersonByNameQuery),
    ...createEmptyResultStubs(findDeviceActivationByIdQuery),

    // Location data stubs
    ...electronicMonitoringData.deviceWearers.flatMap(createLocationDataQueryStubsForDeviceWearer),
  ]

  return {
    mappings,
  }
}

export default createLocationDataStubs
