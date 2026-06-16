import faker from '../../faker'
import { WGS84Crime } from '../../types/crime'
import PoliceForceArea from '../../types/policeForceArea'
import createRandomCrime from './createRandomCrime'

const landmarks = [
  { latitude: 51.5033, longitude: -0.1195, name: 'London Eye' },
  { latitude: 51.5155, longitude: -0.1419, name: 'Oxford Circus' },
  { latitude: 51.5138, longitude: -0.0984, name: "St Paul's" },
]

const createRandomCrimeAtLandmark = (pfa: PoliceForceArea, batchId: string): WGS84Crime => {
  const crime = createRandomCrime(pfa, batchId, 'WGS84')
  const landmark = faker.helpers.arrayElement(landmarks)

  return {
    ...crime,
    easting: null,
    northing: null,
    latitude: landmark.latitude,
    longitude: landmark.longitude,
    crimeText: landmark.name,
    datum: 'WGS84',
  }
}

export default createRandomCrimeAtLandmark
