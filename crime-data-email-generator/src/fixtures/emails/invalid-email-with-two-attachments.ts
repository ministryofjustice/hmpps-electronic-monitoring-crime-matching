import Email from '../../types/email'
import createRandomPFA from '../helpers/createRandomPfa'
import createRandomBatchID from '../helpers/createRandomBatchId'
import createBase64CsvFromCrimes from '../helpers/createBase64CsvFromCrimes'
import createRandomCrime from '../helpers/createRandomCrime'
import createValidEmail from '../helpers/createValidEmail'

// Defines an email that should result in status of Error
// Email has two attachments
// When testing, should show error row in the police data dashboard
const createInvalidEmailWithTwoAttachments = (): Email => {
  const pfa = createRandomPFA()
  const pfa2 = createRandomPFA()
  const batchId = createRandomBatchID(pfa)
  const batchId2 = createRandomBatchID(pfa2)
  const attachments = [
    {
      content: createBase64CsvFromCrimes([createRandomCrime(pfa, batchId), createRandomCrime(pfa, batchId)]),
      contentType: 'text/csv',
      contentTransferEncoding: 'base64',
      filename: 'invalid-email-with-two-attachments.csv',
    },
    {
      content: createBase64CsvFromCrimes([createRandomCrime(pfa2, batchId2), createRandomCrime(pfa2, batchId2)]),
      contentType: 'text/csv',
      contentTransferEncoding: 'base64',
      filename: 'invalid-email-with-two-attachments.csv',
    },
  ]

  return {
    ...createValidEmail(),
    attachments,
    filename: 'invalid-email-with-two-attachments.eml',
  }
}

export default createInvalidEmailWithTwoAttachments
