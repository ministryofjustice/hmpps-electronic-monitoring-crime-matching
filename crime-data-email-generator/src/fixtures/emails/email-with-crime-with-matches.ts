import Email from '../../types/email'
import toBase64 from '../helpers/toBase64'
import createValidEmail from '../helpers/createValidEmail'
import createBatchWithCrimeWithMatches from '../batches/batch-with-crime-with-matches'

// Generates an email containing a batch that will match to device data in the FMS dev environment
const createEmailWithCrimeWithMatches = (): Email => {
  const batch = createBatchWithCrimeWithMatches()
  const attachments = [
    {
      content: toBase64(batch.content),
      contentType: 'text/csv',
      contentTransferEncoding: 'base64',
      filename: batch.name,
    },
  ]

  return {
    ...createValidEmail(),
    attachments,
    filename: 'email-with-crime-with-matches.eml',
  }
}

export default createEmailWithCrimeWithMatches
