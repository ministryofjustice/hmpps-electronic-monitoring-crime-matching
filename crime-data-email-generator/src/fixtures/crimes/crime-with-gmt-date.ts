import Crime from '../../types/crime'
import PoliceForceArea from '../../types/policeForceArea'
import createRandomCrime from '../helpers/createRandomCrime'

// Creates a valid crime with a date within GMT
// The police force should convert all dates to UTC
// The dates should be sent in the format YYYYMMDDHHmmss
// The dates should be shown to the user in Europe/London format
const createCrimeWithGmtDate = (pfa: PoliceForceArea, batchId: string): Crime => ({
  ...createRandomCrime(pfa, batchId),
  crimeDateTimeFrom: '20250201000000', // 2025-02-01T00:00:00Z
  crimeDateTimeTo: '20250201110000', // 2025-02-01T11:00:00Z
  crimeText: 'Crime date is reported in GMT, converted to UTC by PFA',
})

export default createCrimeWithGmtDate
