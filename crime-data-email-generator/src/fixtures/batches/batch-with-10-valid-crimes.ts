import { CrimeBatch } from '../../types/batch'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomCrime from '../helpers/createRandomCrime'
import createRandomPFA from '../helpers/createRandomPfa'

const createBatchWith10ValidCrimes = (): CrimeBatch => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes = [...Array(10)].map(() => createRandomCrime(pfa, batchId))

  return {
    name: 'batch-with-10-valid-crimes',
    crimes,
  }
}

export default createBatchWith10ValidCrimes
