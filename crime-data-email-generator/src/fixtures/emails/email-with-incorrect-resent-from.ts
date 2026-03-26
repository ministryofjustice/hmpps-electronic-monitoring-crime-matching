import Email from '../../types/email'
import createValidEmail from '../helpers/createValidEmail'

// Defines an email that should result in status of Error
// Email has invalid resent from
// When testing, should NOT show error row in the police data dashboard, should get sent to DLQ for developer investigation
const createEmailWithIncorrectResentFrom = (): Email => {
  return {
    ...createValidEmail(),
    filename: 'email-with-incorrect-resent-from.eml',
    resentFrom: '<example@example.com>',
  }
}

export default createEmailWithIncorrectResentFrom
