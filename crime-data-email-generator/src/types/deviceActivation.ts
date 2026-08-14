import DevicePosition from './devicePosition'

type DeviceActivation = {
  device_activation_id: number
  device_id: number
  device_serial_number: number
  device_activation_date: Date
  device_deactivation_date: Date
  personId: number
  positions: Array<DevicePosition>
}

export default DeviceActivation
