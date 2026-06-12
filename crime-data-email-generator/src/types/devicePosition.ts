import GeolocationMechanism from './geolocationMechanism'

type DevicePosition = {
  id: number
  direction: number
  geolocationMechanism: GeolocationMechanism
  latitude: number
  longitude: number
  precision: number
  speed: number
  timestamp: Date
}

export default DevicePosition
