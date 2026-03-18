import Email from '../../types/email'
import createValidEmail from '../helpers/createValidEmail'

// Defines an email that should result in status of Error
// Email has invalid subject
// When testing, should NOT show error row in the police data dashboard, should get sent to DLQ for developer investigation
const createInvalidEmailWithIncorrectSubject = (): Email => {
  return {
    ...createValidEmail(),
    filename: 'invalid-email-with-incorrect-subject.eml',
    subject: 'Invalid subject',
  }
}

export default createInvalidEmailWithIncorrectSubject
