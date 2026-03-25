import Email from '../../types/email'
import toBase64 from '../helpers/toBase64'
import createValidEmail from '../helpers/createValidEmail'
import createBatchWith10ValidCrimes from '../batches/batch-with-10-valid-crimes'

// Defines an email that should result in status of Error
// Email has two attachments
// When testing, should show error row in the police data dashboard
const createEmailWithTwoAttachments = (): Email => {
  const batch = createBatchWith10ValidCrimes()
  const batch2 = createBatchWith10ValidCrimes()
  const attachments = [
    {
      content: toBase64(batch.content),
      contentType: 'text/csv',
      contentTransferEncoding: 'base64',
      filename: batch.name,
    },
    {
      content: toBase64(batch2.content),
      contentType: 'text/csv',
      contentTransferEncoding: 'base64',
      filename: batch2.name,
    },
  ]

  return {
    ...createValidEmail(),
    attachments,
    filename: 'email-with-two-attachments.eml',
  }
}

export default createEmailWithTwoAttachments
