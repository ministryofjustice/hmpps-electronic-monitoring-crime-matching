import faker from '../../faker'
import createRandomDeviceActivation from '../helpers/createRandomDeviceActivation'
import createRandomDevicePosition from '../helpers/createRandomDevicePosition'
import createRandomDeviceWearer from '../helpers/createRandomDeviceWearer'
import { METRES_PER_DEGREE_LATITUDE } from '../constants'
import { ElectronicMonitoringData } from './createElectronicMonitoringData'
import { WGS84Crime } from '../../types/crime'
import DevicePosition from '../../types/devicePosition'
import { GeolocationMechanisms } from '../../types/geolocationMechanism'

const POSITION_INTERVAL_MS = 20 * 1000
const SEQUENCE_COUNT = 27 // Exceeds alphabet limit
const INSIDE_POINTS_PER_SEQUENCE = 2

const metresToLatitudeDegrees = (metres: number): number => metres / METRES_PER_DEGREE_LATITUDE

const metresToLongitudeDegrees = (metres: number, latitude: number): number =>
  metres / (METRES_PER_DEGREE_LATITUDE * Math.cos((latitude * Math.PI) / 180))

// Creates a point at a distance and angle from the crime location
const createPointAtDistance = (crime: WGS84Crime, metres: number): { latitude: number; longitude: number } => {
  const theta = faker.number.float({ min: 0, max: 2 * Math.PI, fractionDigits: 12 })
  const latitudeOffset = metresToLatitudeDegrees(metres * Math.sin(theta))
  const longitudeOffset = metresToLongitudeDegrees(metres * Math.cos(theta), crime.latitude)

  return {
    latitude: crime.latitude + latitudeOffset,
    longitude: crime.longitude + longitudeOffset,
  }
}

const createPosition = (
  deviceId: number,
  personId: number,
  timestamp: Date,
  latitude: number,
  longitude: number,
): DevicePosition =>
  createRandomDevicePosition({
    deviceId,
    personId,
    timestamp,
    latitude,
    longitude,
    geolocationMechanism: GeolocationMechanisms.GPS,
    precision: 1,
    direction: 0,
    speed: 1,
  })

const createEdgeCasePositions = (crime: WGS84Crime, deviceId: number, personId: number): Array<DevicePosition> => {
  const positions: Array<DevicePosition> = []
  let timestamp = crime.crimeDateTimeFrom

  for (let sequence = 0; sequence < SEQUENCE_COUNT; sequence += 1) {
    // Create one initial position outside the radius
    const outsideBefore = createPointAtDistance(crime, faker.number.float({ min: 100, max: 150, fractionDigits: 6 }))

    positions.push(createPosition(deviceId, personId, timestamp, outsideBefore.latitude, outsideBefore.longitude))
    timestamp = new Date(timestamp.getTime() + POSITION_INTERVAL_MS)

    // Create two positions inside the radius
    for (let i = 0; i < INSIDE_POINTS_PER_SEQUENCE; i += 1) {
      const inside = createPointAtDistance(crime, faker.number.float({ min: 5, max: 70, fractionDigits: 6 }))

      positions.push(createPosition(deviceId, personId, timestamp, inside.latitude, inside.longitude))
      timestamp = new Date(timestamp.getTime() + POSITION_INTERVAL_MS)
    }

    // Create one final position outside the radius
    const outsideAfter = createPointAtDistance(crime, faker.number.float({ min: 100, max: 150, fractionDigits: 6 }))

    positions.push(createPosition(deviceId, personId, timestamp, outsideAfter.latitude, outsideAfter.longitude))
    timestamp = new Date(timestamp.getTime() + POSITION_INTERVAL_MS)
  }

  return positions
}

const createElectronicMonitoringEdgeCaseData = (crime: WGS84Crime): ElectronicMonitoringData => {
  const deviceWearer = createRandomDeviceWearer()
  const activation = createRandomDeviceActivation({
    personId: deviceWearer.mdssPersonId,
    device_activation_date: new Date(crime.crimeDateTimeFrom.getTime() - 24 * 60 * 60 * 1000),
    device_deactivation_date: new Date(crime.crimeDateTimeTo.getTime() + 24 * 60 * 60 * 1000),
  })

  return {
    deviceWearers: [
      {
        ...deviceWearer,
        deviceActivations: [
          {
            ...activation,
            positions: createEdgeCasePositions(crime, activation.device_id, deviceWearer.mdssPersonId),
          },
        ],
      },
    ],
  }
}

export default createElectronicMonitoringEdgeCaseData
