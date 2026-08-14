import Email from '../../types/email'
import toBase64 from '../helpers/toBase64'
import createValidEmail from '../helpers/createValidEmail'
import createBatchWith1000ValidCrimes from '../batches/batch-with-1000-valid-crimes'
import createCsvFromCrimes from '../helpers/createCsvFromCrimes'

// Defines an email that should result in a status of "Ingested"
// Email contains 1000 random crimes
// When testing, the crime dates should be displayed in Europe/London
const createEmailWith1000Crimes = (): Email => {
  const batch = createBatchWith1000ValidCrimes()
  const attachments = [
    {
      content: toBase64(createCsvFromCrimes(batch.crimes)),
      contentType: 'text/csv',
      contentTransferEncoding: 'base64',
      filename: `${batch.name}.csv`,
    },
  ]

  return {
    ...createValidEmail(),
    attachments,
    filename: 'email-with-1000-crimes.eml',
  }
}

export default createEmailWith1000Crimes
