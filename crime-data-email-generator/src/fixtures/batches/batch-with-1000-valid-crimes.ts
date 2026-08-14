import { CrimeBatch } from '../../types/batch'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomCrime from '../helpers/createRandomCrime'
import createRandomPFA from '../helpers/createRandomPfa'

const createBatchWith1000ValidCrimes = (): CrimeBatch => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes = [...Array(1000)].map(() => createRandomCrime(pfa, batchId))

  return {
    name: 'batch-with-1000-valid-crimes',
    crimes,
  }
}

export default createBatchWith1000ValidCrimes
