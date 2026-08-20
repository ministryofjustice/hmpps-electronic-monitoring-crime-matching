import faker from '../../faker'
import Crime, { WGS84Crime } from '../../types/crime'
import DeviceActivation from '../../types/deviceActivation'
import DeviceWearer from '../../types/deviceWearer'
import { DEVICE_ACTIVATION_NOT_DEACTIVATED_SENTINEL_VALUE } from '../constants'
import createRandomDeviceActivation from '../helpers/createRandomDeviceActivation'
import createRandomDeviceWearer from '../helpers/createRandomDeviceWearer'
import createRandomTrail from '../helpers/createRandomTrail'
import createTrailPassingThroughCrimeLocation from '../helpers/createTrailPassingThroughCrime'

type ElectronicMonitoringData = {
  deviceWearers: Array<DeviceWearer>
}

/**
 * Creates a device activation that ensures the activation date is before a crime and deactivation date is after a crime.
 * @param personId
 * @param crime
 */
const createDeviceActivationIncludingMatchedCrime = async (personId: number, crime: WGS84Crime) => {
  const activation = createRandomDeviceActivation({
    personId,
    device_activation_date: faker.date.recent({
      days: 180,
      refDate: crime.crimeDateTimeFrom,
    }),
    device_deactivation_date: faker.date.soon({
      days: 180,
      refDate: crime.crimeDateTimeTo,
    }),
  })

  console.log(`\tCrime ref: ${crime.crimeReference}, device id: ${activation.device_id}`)

  const positions = await createTrailPassingThroughCrimeLocation(activation.device_id, personId, crime)

  return {
    ...activation,
    positions,
  }
}

/**
 * Create a random device activation
 * @param personId
 * @returns
 */
const createDeviceActivationWithoutMatchedCrime = async (personId: number) => {
  const activation = createRandomDeviceActivation({
    personId,
  })

  const isDeactivatedActivation =
    activation.device_deactivation_date !== DEVICE_ACTIVATION_NOT_DEACTIVATED_SENTINEL_VALUE

  // Create a start time for trial within the device activation or if the device activation is active,
  // create start time within first 30 days of activation
  const startTimestamp = faker.date.between({
    from: activation.device_activation_date,
    to: isDeactivatedActivation
      ? activation.device_deactivation_date
      : faker.date.soon({ days: 30, refDate: activation.device_activation_date }),
  })

  const positions = createRandomTrail(activation.device_id, personId, startTimestamp)

  return {
    ...activation,
    positions,
  }
}

const selectCrime = (crimes: Array<Crime>): WGS84Crime | undefined =>
  faker.helpers.maybe(() => faker.helpers.arrayElement(crimes.filter(crime => crime.datum === 'WGS84')), {
    probability: 0.2,
  })

const createDeviceActivation = async (personId: number, crimes: Array<Crime>) => {
  const selectedCrime = selectCrime(crimes)

  if (selectedCrime) {
    return createDeviceActivationIncludingMatchedCrime(personId, selectedCrime)
  }

  return createDeviceActivationWithoutMatchedCrime(personId)
}

const createDeviceWearer = async (crimes: Array<Crime>): Promise<DeviceWearer> => {
  const deviceWearer = createRandomDeviceWearer()
  const deviceActivations: Array<DeviceActivation> = []
  console.log(deviceWearer.firstName)

  for (let i = 0; i < faker.number.int({ min: 1, max: 3 }); i += 1) {
    deviceActivations.push(await createDeviceActivation(deviceWearer.mdssPersonId, crimes))
  }

  return {
    ...deviceWearer,
    deviceActivations,
  }
}

const createElectronicMonitoringData = async (
  deviceWearerCount: number,
  crimes: Array<Crime>,
): Promise<ElectronicMonitoringData> => {
  const deviceWearers: Array<DeviceWearer> = []

  for (let i = 0; i < deviceWearerCount; i += 1) {
    deviceWearers.push(await createDeviceWearer(crimes))
  }

  return { deviceWearers }
}

export { ElectronicMonitoringData }

export default createElectronicMonitoringData
