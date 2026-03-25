import File from '../../types/file'
import createCrimeWithBstDate from '../crimes/crime-with-bst-date'
import createCrimeWithGmtDate from '../crimes/crime-with-gmt-date'
import createCsvFromCrimes from "../helpers/createCsvFromCrimes"
import createRandomBatchID from "../helpers/createRandomBatchId"
import createRandomPFA from "../helpers/createRandomPfa"

const createBatchWithUtcAndBstDates = (): File => {
    const pfa = createRandomPFA()
    const batchId = createRandomBatchID(pfa)
    const crimes = [
        createCrimeWithGmtDate(pfa, batchId),
        createCrimeWithBstDate(pfa, batchId)
    ]

    return {
        name: 'batch-with-utc-and-bst-dates.csv',
        content: createCsvFromCrimes(crimes)
    }
}

export default createBatchWithUtcAndBstDates