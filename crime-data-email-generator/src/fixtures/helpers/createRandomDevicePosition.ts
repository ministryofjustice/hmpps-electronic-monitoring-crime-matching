import faker from '../../faker'
import DevicePosition from '../../types/devicePosition'
import createRandomLatitude from './createRandomLatitude'
import createRandomLongitude from './createRandomLongitude'
import { formatAthenaTimestamp } from './formatDate'
import createRandomSpeed from './createRandomSpeed'
import createRandomDirection from './createRandomDirection'
import createRandomPrecision from './createRandomPrecision'
import { GeolocationMechanisms } from '../../types/geolocationMechanism'

const createRandomDevicePosition = (): DevicePosition => {
  const timestamp = faker.date.past({ years: 5 })

  return {
    id: faker.number.int(),
    direction: createRandomDirection(),
    geolocationMechanism: GeolocationMechanisms.GPS,
    latitude: createRandomLatitude('WGS84')!,
    longitude: createRandomLongitude('WGS84')!,
    precision: createRandomPrecision(),
    speed: createRandomSpeed(),
    timestamp: formatAthenaTimestamp(timestamp), // YYYY-MM-DD HH:mm:ss.SSS
  }
}

export default createRandomDevicePosition
