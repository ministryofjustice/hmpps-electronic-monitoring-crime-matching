import faker from '../../faker'
import Coordinate from '../../types/coordinate'
import { WGS84Crime } from '../../types/crime'
import DevicePosition from '../../types/devicePosition'
import createRandomDevicePosition from './createRandomDevicePosition'
import createRandomGpsNoise from './createRandomGpsNoise'
import createRandomWalkingSpeed from './createRandomWalkingSpeed'
import { calculateDistance, interpolatePosition } from './geometry'

type OSRMResponse = {
  routes: Array<{
    geometry: {
      type: string
      coordinates: Array<[number, number]>
    }
  }>
}

/**
 * Plan a route using the Open Source Routing Machine
 */
const createRoute = async (waypoints: Array<Coordinate>): Promise<Array<Coordinate>> => {
  const coordinates = waypoints.map(({ latitude, longitude }) => `${longitude},${latitude}`).join(';')
  const response = await fetch(
    `https://router.project-osrm.org/route/v1/foot/${coordinates}?overview=full&geometries=geojson&steps=false`,
  )

  const body = (await response.json()) as OSRMResponse

  return body.routes[0].geometry.coordinates.map(([longitude, latitude]) => ({ latitude, longitude }))
}

const createNearbyLocation = (crime: WGS84Crime, maxDistance: number = 2) => {
  const location = faker.location.nearbyGPSCoordinate({
    origin: [crime.latitude, crime.longitude],
    radius: maxDistance,
    isMetric: true,
  })

  return { latitude: location[0], longitude: location[1] }
}

const createTrailAlongRoute = (segments: Array<Coordinate>, startTimestamp: Date): Array<DevicePosition> => {
  const positions: Array<DevicePosition> = []

  let currentSegmentIndex = 0
  let distanceAlongSegment = 0
  let timestamp = startTimestamp

  const segmentLengths = segments.map((segment, i) => {
    if (i === segments.length - 1) {
      return 0
    }
    return calculateDistance(segment, segments[i + 1])
  })

  while (currentSegmentIndex < segments.length - 1) {
    const segmentStart = segments[currentSegmentIndex]
    const segmentEnd = segments[currentSegmentIndex + 1]
    const segmentLength = calculateDistance(segmentStart, segmentEnd)

    if (segmentLength === 0) {
      currentSegmentIndex += 1
    } else {
      const progress = distanceAlongSegment / segmentLength

      const position = createRandomGpsNoise(interpolatePosition(segmentStart, segmentEnd, progress))

      positions.push({
        ...createRandomDevicePosition(),
        latitude: position.latitude,
        longitude: position.longitude,
        timestamp,
      })

      // Progress time and distance by 60s
      distanceAlongSegment += createRandomWalkingSpeed() * 60
      timestamp = new Date(timestamp.getTime() + 1000 * 60)

      // Calculate next segment
      while (currentSegmentIndex < segments.length - 1 && distanceAlongSegment >= segmentLengths[currentSegmentIndex]) {
        distanceAlongSegment -= segmentLengths[currentSegmentIndex]
        currentSegmentIndex += 1
      }
    }
  }

  return positions
}

const createTrailPassingThroughCrimeLocation = async (crime: WGS84Crime): Promise<Array<DevicePosition>> => {
  const start = createNearbyLocation(crime)
  const end = createNearbyLocation(crime)
  const coordinates = await createRoute([start, crime, end])

  return createTrailAlongRoute(coordinates, crime.crimeDateTimeFrom)
}

export default createTrailPassingThroughCrimeLocation
