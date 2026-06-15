import faker from '../../faker'
import Crime from '../../types/crime'
import PoliceForceArea from '../../types/policeForceArea'
import createRandomDatum from './createRandomDatum'
import createRandomCrimeType from './createRandomCrimeType'
import createRandomCrimeReference from './createRandomCrimeReference'
import createRandomEasting from './createRandomEasting'
import createRandomNorthing from './createRandomNorthing'
import createRandomLatitude from './createRandomLatitude'
import createRandomLongitude from './createRandomLongitude'
import Datum from '../../types/datum'

const createRandomWGS84Crime = (
  pfa: PoliceForceArea,
  batchId: string,
  crimeDateTimeFrom: Date,
  crimeDateTimeTo: Date,
): Crime => {
  return {
    policeForceArea: pfa,
    crimeType: createRandomCrimeType(),
    crimeTypeDescription: '',
    batchId,
    crimeReference: createRandomCrimeReference(),
    crimeDateTimeFrom,
    crimeDateTimeTo,
    easting: null,
    northing: null,
    latitude: createRandomLatitude(),
    longitude: createRandomLongitude(),
    datum: 'WGS84',
    crimeText: '',
  }
}

const createRandomOSGB36Crime = (
  pfa: PoliceForceArea,
  batchId: string,
  crimeDateTimeFrom: Date,
  crimeDateTimeTo: Date,
): Crime => {
  return {
    policeForceArea: pfa,
    crimeType: createRandomCrimeType(),
    crimeTypeDescription: '',
    batchId,
    crimeReference: createRandomCrimeReference(),
    crimeDateTimeFrom,
    crimeDateTimeTo,
    easting: createRandomEasting(),
    northing: createRandomNorthing(),
    latitude: null,
    longitude: null,
    datum: 'OSGB36',
    crimeText: '',
  }
}

const createRandomCrime = (pfa: PoliceForceArea, batchId: string, datum: Datum = createRandomDatum()): Crime => {
  const crimeDateTimeFrom = faker.date.past({ years: 5 })
  const crimeDateTimeTo = faker.date.between({
    from: crimeDateTimeFrom,
    to: new Date(crimeDateTimeFrom.getTime() + 12 * 60 * 60 * 1000),
  })

  if (datum === 'WGS84') {
    return createRandomWGS84Crime(pfa, batchId, crimeDateTimeFrom, crimeDateTimeTo)
  }

  return createRandomOSGB36Crime(pfa, batchId, crimeDateTimeFrom, crimeDateTimeTo)
}

export default createRandomCrime
