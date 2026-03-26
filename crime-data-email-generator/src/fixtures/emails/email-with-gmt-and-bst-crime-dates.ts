import Email from '../../types/email'
import toBase64 from '../helpers/toBase64'
import createValidEmail from '../helpers/createValidEmail'
import createBatchWithUtcAndBstDates from '../batches/batch-with-utc-and-bst-dates'

// Defines an email that should result in a status of "Ingested"
// Email contains two crimes, one happens in GMT, one in BST
// Both crimes will be reported in UTC format
// When testing, the crime dates should be displayed in Europe/London
const createEmailWithGmtAndBstCrimeDates = (): Email => {
  const batch = createBatchWithUtcAndBstDates()
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
    filename: 'email-with-gmt-and-bst-crime-dates.eml',
  }
}

export default createEmailWithGmtAndBstCrimeDates
