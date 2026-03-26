import Email from '../../types/email'
import toBase64 from '../helpers/toBase64'
import createValidEmail from '../helpers/createValidEmail'
import createBatchWith100ValidCrimes from '../batches/batch-with-100-valid-crimes'

// Defines an email that should result in a status of "Ingested"
// Email contains 100 random crimes
// When testing, the crime dates should be displayed in Europe/London
const createEmailWith100Crimes = (): Email => {
  const batch = createBatchWith100ValidCrimes()
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
    filename: 'email-with-100-crimes.eml',
  }
}

export default createEmailWith100Crimes
