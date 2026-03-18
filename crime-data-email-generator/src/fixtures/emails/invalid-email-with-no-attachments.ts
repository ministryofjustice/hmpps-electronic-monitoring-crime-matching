import Email from '../../types/email'
import createValidEmail from '../helpers/createValidEmail'

// Defines an email that should result in status of Error
// Email has no attachments
// When testing, should show error row in the police data dashboard
const createInvalidEmailWithNoAttachments = (): Email => {
  return {
    ...createValidEmail(),
    attachments: [],
    filename: 'invalid-crimes-with-no-attachments.eml',
  }
}

export default createInvalidEmailWithNoAttachments
