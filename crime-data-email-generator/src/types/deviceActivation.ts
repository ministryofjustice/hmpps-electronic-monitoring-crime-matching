import DevicePosition from './devicePosition'

type DeviceActivation = {
  device_activation_id: number
  device_id: number
  device_activation_date: Date
  device_deactivation_date: Date | null
  positions: Array<DevicePosition>
}

export default DeviceActivation
