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

const createTrail = async (crimes: Array<Crime>): Promise<Array<DevicePosition>> => {
  // Pick a random crime to create a trail near
  const selectedCrime = faker.helpers.maybe(
    () => faker.helpers.arrayElement(crimes.filter(crime => crime.datum === 'WGS84')),
    {
      probability: 0.2,
    },
  )

  if (selectedCrime === undefined) {
    return createRandomTrail()
  }

  console.log(`\t\t${selectedCrime.crimeReference}`)

  return createTrailPassingThroughCrimeLocation(selectedCrime)
}

const createDeviceActivationWithPositions = async (crimes: Array<Crime>) => {
  const activation = createRandomDeviceActivation()

  console.log(`\t${activation.device_id}`)

  const positions = await createTrail(crimes)

  return {
    ...activation,
    positions,
  }
}

const createDeviceWearer = async (crimes: Array<Crime>): Promise<DeviceWearer> => {
  const deviceWearer = createRandomDeviceWearer()

  console.log(deviceWearer.firstName)

  const deviceActivationPromises = faker.helpers.multiple(() => createDeviceActivationWithPositions(crimes))
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
