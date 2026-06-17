import GeolocationMechanism from './geolocationMechanism'

type DevicePosition = {
  id: number
  deviceId: number
  direction: number
  geolocationMechanism: GeolocationMechanism
  latitude: number
  longitude: number
  personId: number
  precision: number
  speed: number
  timestamp: Date
}

export default DevicePosition
