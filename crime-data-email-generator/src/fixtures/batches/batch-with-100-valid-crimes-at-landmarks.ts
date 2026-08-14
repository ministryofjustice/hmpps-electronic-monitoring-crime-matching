import { CrimeBatch } from '../../types/batch'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomCrimeAtLandmark from '../helpers/createRandomCrimeAtLandmark'
import createRandomPFA from '../helpers/createRandomPfa'

/**
 * Generate a batch containing 100 crimes at well known locations
 * @returns File
 */
const createBatchWith100ValidCrimesAtLandmarks = (): CrimeBatch => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes = [...Array(100)].map(() => createRandomCrimeAtLandmark(pfa, batchId))

  return {
    name: 'batch-with-100-valid-crimes-at-landmarks',
    crimes,
  }
}

export default createBatchWith100ValidCrimesAtLandmarks
