import Crime from '../../types/crime'
import PoliceForceArea from '../../types/policeForceArea'
import createRandomCrime from '../helpers/createRandomCrime'

// Creates a valid crime with a date within BST
// The police force should convert all dates to UTC
// The dates should be sent in the format YYYYMMDDHHmmss
// The dates should be shown to the user in Europe/London format
const createCrimeWithBstDate = (pfa: PoliceForceArea, batchId: string): Crime => ({
  ...createRandomCrime(pfa, batchId),
  crimeDateTimeFrom: '20250715230000', // 2025-07-16T00:00:00+0100 / 2025-07-15T23:00:00Z
  crimeDateTimeTo: '20250716110000', // 2025-07-16T12:00:00+0100 / 2025-07-16T11:00:00Z
  crimeText: 'Crime date is reported in BST, converted to UTC by PFA',
})

export default createCrimeWithBstDate
