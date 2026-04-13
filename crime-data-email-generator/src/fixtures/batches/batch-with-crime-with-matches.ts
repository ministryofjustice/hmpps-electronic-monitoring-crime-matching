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
        crimeDateTimeFrom: '20251016130000', 
        crimeDateTimeTo: '20251016170000',
        easting: '',
        northing: '',
        latitude: '53.43157277',
        longitude: '-2.528865717',
        datum: 'WGS84',
        crimeText: ''
    }
  ]

  return {
    name: 'batch-with-crime-with-matches.csv',
    content: createCsvFromCrimes(crimes),
  }
}

export default createBatchWithCrimeWithMatches
