import Crime from '../../types/crime'
import File from '../../types/file'
import createCsvFromCrimes from '../helpers/createCsvFromCrimes'

// Generates a batch containing a crime that will match to device data in the FMS dev environment
const createBatchWithCrimeWithMatches = (): File => {
  const crimes: Array<Crime> = [
    {
      policeForceArea: 'Cheshire',
      crimeType: 'BOTD',
      crimeTypeDescription: 'crimeDesc',
      batchId: 'CHS20260101',
      crimeReference: 'CHS0000001',
      crimeDateTimeFrom: new Date('2025-10-16T13:00:00+0100'),
      crimeDateTimeTo: new Date('2025-10-16T17:00:00+0100'),
      easting: null,
      northing: null,
      latitude: 53.43157277,
      longitude: -2.528865717,
      datum: 'WGS84',
      crimeText: '',
    },
  ]

  return {
    name: 'batch-with-crime-with-matches.csv',
    content: createCsvFromCrimes(crimes),
  }
}

export default createBatchWithCrimeWithMatches
