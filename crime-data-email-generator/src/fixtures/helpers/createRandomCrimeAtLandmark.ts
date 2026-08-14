import { WGS84Crime } from '../../types/crime'
import PoliceForceArea from '../../types/policeForceArea'
import createRandomCrime from './createRandomCrime'
import createRandomLandmark from './createRandomLandmark'

const createRandomCrimeAtLandmark = (pfa: PoliceForceArea, batchId: string): WGS84Crime => {
  const crime = createRandomCrime(pfa, batchId, 'WGS84')
  const landmark = createRandomLandmark()

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
