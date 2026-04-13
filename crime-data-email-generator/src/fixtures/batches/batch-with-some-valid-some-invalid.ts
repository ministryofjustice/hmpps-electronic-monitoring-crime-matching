import Crime from '../../types/crime'
import File from '../../types/file'
import createCsvFromCrimes from '../helpers/createCsvFromCrimes'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomCrime from '../helpers/createRandomCrime'
import createRandomPFA from '../helpers/createRandomPfa'

const createBatchWithSomeValidSomeInvalidCrimes = (): File => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes: Array<Crime> = [
    ...[...Array(10)].map(() => createRandomCrime(pfa, batchId)),
    // Invalid crime type
    {
      ...createRandomCrime(pfa, batchId),
      crimeType: '',
    },
  ]

  return {
    name: 'batch-with-some-valid-some-invalid.csv',
    content: createCsvFromCrimes(crimes),
  }
}

export default createBatchWithSomeValidSomeInvalidCrimes
