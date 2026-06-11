import GeolocationMechanism from './geolocationMechanism'

type DevicePosition = {
  id: number
  direction: number
  geolocationMechanism: GeolocationMechanism
  latitude: number
  longitude: number
  precision: number
  speed: number
  timestamp: string
}

export default DevicePosition
