import File from '../../types/file'
import createCsvFromCrimes from '../helpers/createCsvFromCrimes'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomCrime from '../helpers/createRandomCrime'
import createRandomPFA from '../helpers/createRandomPfa'

const createBatchWith100ValidCrimes = (): File => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes = [...Array(100)].map(() => createRandomCrime(pfa, batchId))

  return {
    name: 'batch-with-100-valid-crimes.csv',
    content: createCsvFromCrimes(crimes),
  }
}

export default createBatchWith100ValidCrimes
