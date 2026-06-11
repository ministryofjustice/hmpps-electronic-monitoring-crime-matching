import DeviceWearer from '../../types/deviceWearer'
import createRandomDeviceActivation from '../helpers/createRandomDeviceActivation'
import createRandomDevicePosition from '../helpers/createRandomDevicePosition'
import createRandomDeviceWearer from '../helpers/createRandomDeviceWearer'

type ElectronicMonitoringData = {
  deviceWearers: Array<DeviceWearer>
}

const createElectronicMonitoringData = (deviceWearerCount: number): ElectronicMonitoringData => {
  return {
    deviceWearers: [...Array(deviceWearerCount)].map(() => {
      const deviceWearer = createRandomDeviceWearer()
      const deviceActivation = createRandomDeviceActivation()
      const devicePosition = createRandomDevicePosition()

      return {
        ...deviceWearer,
        deviceActivations: [
          {
            ...deviceActivation,
            positions: [devicePosition],
          },
        ],
      }
    }),
  }
}

export { ElectronicMonitoringData }

export default createElectronicMonitoringData
