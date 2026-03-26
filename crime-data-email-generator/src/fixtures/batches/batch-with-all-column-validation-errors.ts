import Crime from '../../types/crime'
import File from '../../types/file'
import createCsvFromCrimes from '../helpers/createCsvFromCrimes'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomCrime from '../helpers/createRandomCrime'
import createRandomEasting from '../helpers/createRandomEasting'
import createRandomNorthing from '../helpers/createRandomNorthing'
import createRandomPFA from '../helpers/createRandomPfa'
import lookupPfaShortcode from '../helpers/lookupPfaShortCode'

const createBatchWithAllColumnValidations = (): File => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes: Array<Crime> = [
    // Crime with missing PFA
    {
      ...createRandomCrime(pfa, batchId),
      policeForceArea: '',
    },
    // Crime with missing Batch ID
    {
      ...createRandomCrime(pfa, batchId),
      batchId: '',
    },
    // Crime with missing crime reference
    {
      ...createRandomCrime(pfa, batchId),
      crimeReference: '',
    },
    // Crime with missing crime type
    {
      ...createRandomCrime(pfa, batchId),
      crimeType: '',
    },
    // Crime with missing crime date time from
    {
      ...createRandomCrime(pfa, batchId),
      crimeDateTimeFrom: '',
    },
    // Crime with missing crime date time to
    {
      ...createRandomCrime(pfa, batchId),
      crimeDateTimeTo: '',
    },
    // Crime with missing location
    {
      ...createRandomCrime(pfa, batchId),
      easting: '',
      northing: '',
      latitude: '',
      longitude: '',
    },
    // Crime with invalid PFA
    {
      ...createRandomCrime(pfa, batchId),
      policeForceArea: 'UNKNOWN',
    },
    // Crime with invalid PFA shortcode in Batch ID
    {
      ...createRandomCrime(pfa, batchId),
      batchId: 'XXX20260101',
    },
    // Crime with invalid date in Batch ID (too far in the past)
    {
      ...createRandomCrime(pfa, batchId),
      batchId: `${lookupPfaShortcode(pfa)}19990101`,
    },
    // Crime with invalid crime type
    {
      ...createRandomCrime(pfa, batchId),
      crimeType: 'UNKNOWN',
    },
    // Crime with invalid crime date time from format
    {
      ...createRandomCrime(pfa, batchId),
      crimeDateTimeFrom: '2026-01-01T00:00:00.000Z',
    },
    // Crime with invalid crime date time to format
    {
      ...createRandomCrime(pfa, batchId),
      crimeDateTimeTo: '2026-01-01T00:00:00.000Z',
    },
    // Crime with crimeDateTimeTo before crimeDateTimeFrom
    {
      ...createRandomCrime(pfa, batchId),
      crimeDateTimeFrom: '20260201000000',
      crimeDateTimeTo: '20260131000000',
    },
    // Crime with window of opportunity > 12 hours
    {
      ...createRandomCrime(pfa, batchId),
      crimeDateTimeFrom: '20260201000000',
      crimeDateTimeTo: '20260204000000',
    },
    // Crime with out of range (lower) easting
    {
      ...createRandomCrime(pfa, batchId, 'OSGB36'),
      easting: '-1',
    },
    // Crime with out of range (upper) easting
    {
      ...createRandomCrime(pfa, batchId, 'OSGB36'),
      easting: '600001',
    },
    // Crime with out of range (lower) northing
    {
      ...createRandomCrime(pfa, batchId, 'OSGB36'),
      northing: '-1',
    },
    // Crime with out of range (upper) northing
    {
      ...createRandomCrime(pfa, batchId, 'OSGB36'),
      northing: '1300001',
    },
    // Crime with out of range (lower) latitude
    {
      ...createRandomCrime(pfa, batchId, 'WGS84'),
      latitude: '49.4',
    },
    // Crime with out of range (upper) latitude
    {
      ...createRandomCrime(pfa, batchId, 'WGS84'),
      latitude: '61.6',
    },
    // Crime with out of range (lower) longitude
    {
      ...createRandomCrime(pfa, batchId, 'WGS84'),
      longitude: '-8.6',
    },
    // Crime with out of range (upper) longitude
    {
      ...createRandomCrime(pfa, batchId, 'WGS84'),
      longitude: '2.7',
    },
    // Crime with both WGS84 and OSGB36
    {
      ...createRandomCrime(pfa, batchId, 'WGS84'),
      easting: createRandomEasting('OSGB36'),
      northing: createRandomNorthing('OSGB36'),
    },
  ]

  return {
    name: 'batch-with-all-column-validation-errors.csv',
    content: createCsvFromCrimes(crimes),
  }
}

export default createBatchWithAllColumnValidations
