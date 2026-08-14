import { CrimeBatchLike } from '../../types/batch'
import { CrimeLike } from '../../types/crime'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomCrime from '../helpers/createRandomCrime'
import createRandomPFA from '../helpers/createRandomPfa'

const createBatchWithSomeValidSomeInvalidCrimes = (): CrimeBatchLike => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes: Array<CrimeLike> = [
    ...[...Array(10)].map(() => createRandomCrime(pfa, batchId)),
    // Invalid crime type
    {
      ...createRandomCrime(pfa, batchId),
      crimeType: '',
    },
  ]

  return {
    name: 'batch-with-some-valid-some-invalid',
    crimes,
  }
}

export default createBatchWithSomeValidSomeInvalidCrimes
