import Email from '../../types/email'
import createValidCrimeWithGmtDate from '../crimes/valid-crime-with-gmt-date'
import createValidCrimeWithBstDate from '../crimes/valid-crime-with-bst-date'
import createRandomPFA from '../helpers/createRandomPfa'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createBase64CsvFromCrimes from '../helpers/createBase64CsvFromCrimes'
import createValidEmail from '../helpers/createValidEmail'

// Defines an email that should result in a status of "Ingested"
// Email contains two crimes, one happens in GMT, one in BST
// Both crimes will be reported in UTC format
// When testing, the crime dates should be displayed in Europe/London
const createValidEmailWithCrimesInDifferentTimezones = (): Email => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const attachments = [
    {
      content: createBase64CsvFromCrimes([
        createValidCrimeWithGmtDate(pfa, batchId),
        createValidCrimeWithBstDate(pfa, batchId),
      ]),
      contentType: 'text/csv',
      contentTransferEncoding: 'base64',
      filename: 'valid-crimes-with-gmt-and-bst-crime-dates.csv',
    },
  ]

  return {
    ...createValidEmail(),
    attachments,
    filename: 'valid-crimes-with-gmt-and-bst-crime-dates.eml',
  }
}

export default createValidEmailWithCrimesInDifferentTimezones
