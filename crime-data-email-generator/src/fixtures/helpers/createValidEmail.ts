import Email from '../../types/email'
import createRandomPFA from './createRandomPfa'
import createRandomBatchID from './createRandomBatchId'
import createBase64CsvFromCrimes from './createBase64CsvFromCrimes'
import createRandomCrime from './createRandomCrime'

// Defines an email that should result in status of Ingested
// Email has valid subject, sender and attachment with two valid crimes
const createValidEmail = (): Omit<Email, 'filename'> => {
  const pfa = createRandomPFA()
  const batchId = createRandomBatchID(pfa)

  return {
    attachments: [
      {
        content: createBase64CsvFromCrimes([createRandomCrime(pfa, batchId), createRandomCrime(pfa, batchId)]),
        contentType: 'text/csv',
        contentTransferEncoding: 'base64',
        filename: 'valid-email.csv',
      },
    ],
    body: 'Hello world',
    from: 'test@email.com',
    resentFrom: '<shared-mailbox@email.com>',
    sentDate: 'Wed, 15 Oct 2025 13:56:58 +0000',
    subject: 'Crime Mapping Request',
  }
}

export default createValidEmail
