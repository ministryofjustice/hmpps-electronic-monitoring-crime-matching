import faker from '../../faker'
import Coordinate from '../../types/coordinate'

const createRandomGpsNoise = (coordinate: Coordinate): Coordinate => {
  const noisyCoordinate = faker.location.nearbyGPSCoordinate({
    origin: [coordinate.latitude, coordinate.longitude],
    radius: 0.01, // ~10 metres
    isMetric: true,
  })

  return {
    latitude: noisyCoordinate[0],
    longitude: noisyCoordinate[1],
  }
}

export default createRandomGpsNoise
