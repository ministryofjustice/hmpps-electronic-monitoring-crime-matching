import faker from '../../faker'
import DevicePosition from '../../types/devicePosition'
import createRandomLatitude from './createRandomLatitude'
import createRandomLongitude from './createRandomLongitude'
import createRandomSpeed from './createRandomSpeed'
import createRandomDirection from './createRandomDirection'
import createRandomPrecision from './createRandomPrecision'
import { GeolocationMechanisms } from '../../types/geolocationMechanism'

const createRandomDevicePosition = (overrides: Partial<DevicePosition> = {}): DevicePosition => {
  const timestamp = faker.date.past({ years: 5 })

  return {
    id: faker.number.int(),
    deviceId: faker.number.int(),
    direction: createRandomDirection(),
    geolocationMechanism: GeolocationMechanisms.GPS,
    latitude: createRandomLatitude(),
    longitude: createRandomLongitude(),
    personId: faker.number.int(),
    precision: createRandomPrecision(),
    speed: createRandomSpeed(),
    timestamp,
    ...overrides,
  }
}

export default createRandomDevicePosition
