import { CrimeBatch } from '../../types/batch'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomCrime from '../helpers/createRandomCrime'
import createRandomPFA from '../helpers/createRandomPfa'

const createBatchWith100ValidCrimes = (): CrimeBatch => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes = [...Array(100)].map(() => createRandomCrime(pfa, batchId))

  return {
    name: 'batch-with-100-valid-crimes',
    crimes,
  }
}

export default createBatchWith100ValidCrimes
