import Crime from '../../types/crime'
import PoliceForceArea from '../../types/policeForceArea'
import createRandomCrime from '../helpers/createRandomCrime'

// Creates a invalid crime with an empty PFA
const createInvalidCrimeWithEmptyPfa = (pfa: PoliceForceArea, batchId: string): Crime => ({
  ...createRandomCrime(pfa, batchId),
  policeForceArea: '',
  crimeText: 'Crime date is reported in GMT, converted to UTC by PFA',
})

export default createInvalidCrimeWithEmptyPfa
