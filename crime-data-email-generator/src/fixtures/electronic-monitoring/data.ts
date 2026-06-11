import DeviceWearer from '../../types/deviceWearer'
import createRandomDeviceActivation from '../helpers/createRandomDeviceActivation'
import createRandomDevicePosition from '../helpers/createRandomDevicePosition'
import createRandomDeviceWearer from '../helpers/createRandomDeviceWearer'

type ElectronicMonitoringData = {
  deviceWearers: Array<DeviceWearer>
}

const createElectronicMonitoringData = (): ElectronicMonitoringData => {
  const deviceWearer = createRandomDeviceWearer()
  const deviceActivation = createRandomDeviceActivation()
  const devicePosition = createRandomDevicePosition()

  return {
    deviceWearers: [
      {
        ...deviceWearer,
        deviceActivations: [
          {
            ...deviceActivation,
            positions: [devicePosition],
          },
        ],
      },
    ],
  }
}

export default createElectronicMonitoringData
