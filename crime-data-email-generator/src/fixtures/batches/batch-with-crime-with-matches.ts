import { CrimeBatch } from '../../types/batch'
import Crime from '../../types/crime'

// Matches the seeded Manchester Piccadilly crime XnhRdX0Y2Tw in the standard synthetic dataset.
const createBatchWithCrimeWithMatches = (): CrimeBatch => {
  const crimes: Array<Crime> = [
    {
      policeForceArea: 'Cheshire',
      crimeType: 'BOTD',
      crimeTypeDescription: 'crimeDesc',
      batchId: 'CHS20260101',
      crimeReference: 'CHS0000001',
      crimeDateTimeFrom: new Date('2024-03-31T19:24:39Z'),
      crimeDateTimeTo: new Date('2024-04-01T04:21:48Z'),
      easting: null,
      northing: null,
      latitude: 53.477375,
      longitude: -2.230929,
      datum: 'WGS84',
      crimeText: 'Manchester Piccadilly',
    },
  ]

  return {
    name: 'batch-with-crime-with-matches',
    crimes,
  }
}

export default createBatchWithCrimeWithMatches
