import Email from '../../types/email'
import createValidEmail from '../helpers/createValidEmail'

// Defines an email that should result in status of Error
// Email has incorrect original sender
// When testing, should NOT show error row in the police data dashboard, should get sent to DLQ for developer investigation
const createInvalidEmailWithIncorrectOriginalSender = (): Email => {
  return {
    ...createValidEmail(),
    filename: 'invalid-email-with-incorrect-original-sender.eml',
    from: 'example@email.com',
  }
}

export default createInvalidEmailWithIncorrectOriginalSender
