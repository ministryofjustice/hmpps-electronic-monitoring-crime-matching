import faker from '../../faker'
import DeviceWearer from '../../types/deviceWearer'
import createRandomDeviceActivation from '../helpers/createRandomDeviceActivation'
import createRandomDeviceWearer from '../helpers/createRandomDeviceWearer'
import createRandomTrail from '../helpers/createRandomTrail'

type ElectronicMonitoringData = {
  deviceWearers: Array<DeviceWearer>
}

const createElectronicMonitoringData = (deviceWearerCount: number): ElectronicMonitoringData => {
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
          positions: createRandomTrail(),
        })),
      }
    }),
  }
}

export { ElectronicMonitoringData }

export default createElectronicMonitoringData
