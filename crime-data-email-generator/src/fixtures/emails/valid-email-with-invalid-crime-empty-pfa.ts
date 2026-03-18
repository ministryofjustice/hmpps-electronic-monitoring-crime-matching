import Email from '../../types/email'
import createRandomPFA from '../helpers/createRandomPfa'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createBase64CsvFromCrimes from '../helpers/createBase64CsvFromCrimes'
import createValidEmail from '../helpers/createValidEmail'
import createInvalidCrimeWithEmptyPfa from '../crimes/invalid-crime-with-empty-pfa'

// Defines an email that should result in a status of "Failed Validation"
// Email contains one crime, that has an empty PFA
// When testing, the crime should not be ingested
const createValidEmailWithInvalidCrimeEmptyPfa = (): Email => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const attachments = [
    {
      content: createBase64CsvFromCrimes([
        createInvalidCrimeWithEmptyPfa(pfa, batchId),
      ]),
      contentType: 'text/csv',
      contentTransferEncoding: 'base64',
      filename: 'invalid-crime-with-empty-pfa.csv',
    },
  ]

  return {
    ...createValidEmail(),
    attachments,
    filename: 'valid-email-with-invalid-crime-empty-pfa.eml',
  }
}

export default createValidEmailWithInvalidCrimeEmptyPfa
