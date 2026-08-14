import faker from '../../faker'
import Crime, { WGS84Crime } from '../../types/crime'
import DeviceWearer from '../../types/deviceWearer'
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

  const positions = createRandomTrail(activation.device_id, personId)

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
  console.log(deviceWearer.firstName)
  const deviceActivationPromises = faker.helpers.multiple(
    () => createDeviceActivation(deviceWearer.mdssPersonId, crimes),
    { count: { min: 1, max: 3 } },
  )
  const deviceActivations = await Promise.all(deviceActivationPromises)

  return {
    ...deviceWearer,
    deviceActivations,
  }
}

const createElectronicMonitoringData = async (
  deviceWearerCount: number,
  crimes: Array<Crime>,
): Promise<ElectronicMonitoringData> => {
  return {
    deviceWearers: await Promise.all([...Array(deviceWearerCount)].map(() => createDeviceWearer(crimes))),
  }
}

export { ElectronicMonitoringData }

export default createElectronicMonitoringData
