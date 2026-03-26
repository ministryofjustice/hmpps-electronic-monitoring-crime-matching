import File from '../../types/file'
import createCsvFromCrimes from '../helpers/createCsvFromCrimes'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomCrime from '../helpers/createRandomCrime'
import createRandomPFA from '../helpers/createRandomPfa'

const createBatchWith10ValidCrimes = (): File => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes = [...Array(10)].map(() => createRandomCrime(pfa, batchId))

  return {
    name: 'batch-with-10-valid-crimes.csv',
    content: createCsvFromCrimes(crimes),
  }
}

export default createBatchWith10ValidCrimes
