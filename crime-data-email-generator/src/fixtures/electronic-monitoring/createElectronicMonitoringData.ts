import faker from '../../faker'
import Crime from '../../types/crime'
import DeviceWearer from '../../types/deviceWearer'
import createRandomDeviceActivation from '../helpers/createRandomDeviceActivation'
import createRandomDeviceWearer from '../helpers/createRandomDeviceWearer'
import createRandomTrail from '../helpers/createRandomTrail'

type ElectronicMonitoringData = {
  deviceWearers: Array<DeviceWearer>
}

const createTrail = (crimes: Array<Crime>) => {
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

  return createRandomTrail(selectedCrime.latitude, selectedCrime.longitude)
  return createRandomTrail(selectedCrime.latitude, selectedCrime.longitude, selectedCrime.crimeDateTimeFrom)
}

const createElectronicMonitoringData = (deviceWearerCount: number, crimes: Array<Crime>): ElectronicMonitoringData => {
  return {
    deviceWearers: [...Array(deviceWearerCount)].map(() => {
      const deviceWearer = createRandomDeviceWearer()
      const deviceActivations = faker.helpers.multiple(() => createRandomDeviceActivation(), {
        count: { min: 1, max: 3 },
      })

      return {
        ...deviceWearer,
        deviceActivations: deviceActivations.map(deviceActivation => ({
          ...deviceActivation,
          positions: createTrail(crimes),
        })),
      }
    }),
  }
}

export { ElectronicMonitoringData }

export default createElectronicMonitoringData
