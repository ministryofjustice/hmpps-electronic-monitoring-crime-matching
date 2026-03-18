import { faker } from '@faker-js/faker'
import Crime from '../../types/crime'
import PoliceForceArea from '../../types/policeForceArea'
import createRandomDatum from './createRandomDatum'
import createRandomCrimeType from './createRandomCrimeType'
import createRandomCrimeReference from './createRandomCrimeReference'
import formatDate from './formatDate'
import createRandomEasting from './createRandomEasting'
import createRandomNorthing from './createRandomNorthing'
import createRandomLatitude from './createRandomLatitude'
import createRandomLongitude from './createRandomLongitude'

const createRandomCrime = (pfa: PoliceForceArea, batchId: string): Crime => {
  const crimeDateTimeFrom = faker.date.past({ years: 5 })
  const crimeDateTimeTo = faker.date.between({
    from: crimeDateTimeFrom,
    to: new Date(crimeDateTimeFrom.getTime() + 12 * 60 * 60 * 1000),
  })
  const datum = createRandomDatum()

  return {
    policeForceArea: pfa,
    crimeType: createRandomCrimeType(),
    crimeTypeDescription: '',
    batchId,
    crimeReference: createRandomCrimeReference(),
    crimeDateTimeFrom: formatDate(crimeDateTimeFrom, true),
    crimeDateTimeTo: formatDate(crimeDateTimeTo, true),
    easting: createRandomEasting(datum),
    northing: createRandomNorthing(datum),
    latitude: createRandomLatitude(datum),
    longitude: createRandomLongitude(datum),
    datum,
    crimeText: '',
  }
}

export default createRandomCrime
