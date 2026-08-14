import emails from './fixtures/emails'
import batches from './fixtures/batches'
import { createCsvFileFromBatch, createEmailFile } from './helpers/fs'

/**
 * Creates fake crime data that can be used to validate the police data ingestion data flow
 *
 * Output CSVs can be emailed to the dev mailbox for testing in the dev environment
 * Output email files can be used locally to simulate email ingestion without the need for a real mail client
 */
const createFakeCrimeData = () => {
  for (const email of emails) {
    createEmailFile(email)
  }

  for (const batch of batches) {
    createCsvFileFromBatch(batch)
  }
}

createFakeCrimeData()
