import Coordinate from '../../types/coordinate'
import { METRES_PER_DEGREE_LATITUDE } from '../constants'

const calculateDistance = (from: Coordinate, to: Coordinate): number => {
  const latitudeDistance = (to.latitude - from.latitude) * METRES_PER_DEGREE_LATITUDE
  const latitudeCentre = (((from.latitude + to.latitude) / 2) * Math.PI) / 180
  const longitudeDistance = (to.longitude - from.longitude) * METRES_PER_DEGREE_LATITUDE * Math.cos(latitudeCentre)

  return Math.sqrt(latitudeDistance ** 2 + longitudeDistance ** 2)
}

const interpolatePosition = (from: Coordinate, to: Coordinate, distance: number): Coordinate => {
  return {
    latitude: from.latitude + (to.latitude - from.latitude) * distance,
    longitude: from.longitude + (to.longitude - from.longitude) * distance,
  }
}

export { calculateDistance, interpolatePosition }
