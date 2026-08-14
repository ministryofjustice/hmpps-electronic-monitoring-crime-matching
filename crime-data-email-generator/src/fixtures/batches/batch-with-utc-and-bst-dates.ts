import { CrimeBatch } from '../../types/batch'
import createCrimeWithBstDate from '../crimes/crime-with-bst-date'
import createCrimeWithGmtDate from '../crimes/crime-with-gmt-date'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createRandomPFA from '../helpers/createRandomPfa'

const createBatchWithUtcAndBstDates = (): CrimeBatch => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const crimes = [createCrimeWithGmtDate(pfa, batchId), createCrimeWithBstDate(pfa, batchId)]

  return {
    name: 'batch-with-utc-and-bst-dates',
    crimes,
  }
}

export default createBatchWithUtcAndBstDates
