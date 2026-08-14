import Email from '../../types/email'
import toBase64 from './toBase64'
import createBatchWith10ValidCrimes from '../batches/batch-with-10-valid-crimes'
import createCsvFromCrimes from './createCsvFromCrimes'

// Defines an email that should result in status of Ingested
// Email has valid subject, sender and attachment with two valid crimes
const createValidEmail = (): Omit<Email, 'filename'> => {
  const batch = createBatchWith10ValidCrimes()

  return {
    attachments: [
      {
        content: toBase64(createCsvFromCrimes(batch.crimes)),
        contentType: 'text/csv',
        contentTransferEncoding: 'base64',
        filename: `${batch.name}.csv`,
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
