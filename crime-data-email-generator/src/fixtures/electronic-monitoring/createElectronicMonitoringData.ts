import faker from '../../faker'
import Crime from '../../types/crime'
import DevicePosition from '../../types/devicePosition'
import DeviceWearer from '../../types/deviceWearer'
import createRandomDeviceActivation from '../helpers/createRandomDeviceActivation'
import createRandomDeviceWearer from '../helpers/createRandomDeviceWearer'
import createRandomTrail from '../helpers/createRandomTrail'
import createTrailPassingThroughCrimeLocation from '../helpers/createTrailPassingThroughCrime'

type ElectronicMonitoringData = {
  deviceWearers: Array<DeviceWearer>
}

const createTrail = async (
  deviceId: number,
  personId: number,
  crimes: Array<Crime>,
): Promise<Array<DevicePosition>> => {
  // Pick a random crime to create a trail near
  const selectedCrime = faker.helpers.maybe(
    () => faker.helpers.arrayElement(crimes.filter(crime => crime.datum === 'WGS84')),
    {
      probability: 0.2,
    },
  )

  if (selectedCrime === undefined) {
    return createRandomTrail(deviceId, personId)
  }

  return createTrailPassingThroughCrimeLocation(deviceId, personId, selectedCrime)
}

const createDeviceActivationWithPositions = async (personId: number, crimes: Array<Crime>) => {
  const activation = createRandomDeviceActivation({ personId })
  const positions = await createTrail(activation.device_id, activation.personId, crimes)

  return {
    ...activation,
    positions,
  }
}

const createDeviceWearer = async (crimes: Array<Crime>): Promise<DeviceWearer> => {
  const deviceWearer = createRandomDeviceWearer()
  const deviceActivationPromises = faker.helpers.multiple(
    () => createDeviceActivationWithPositions(deviceWearer.mdssPersonId, crimes),
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
