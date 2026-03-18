import Email from '../../types/email'
import createInvalidEmailWithIncorrectOriginalSender from './invalid-email-with-incorrect-original-sender'
import createInvalidEmailWithIncorrectResentFrom from './invalid-email-with-incorrect-resent-from'
import createInvalidEmailWithIncorrectSubject from './invalid-email-with-incorrect-subject'
import createInvalidEmailWithNoAttachments from './invalid-email-with-no-attachments'
import createInvalidEmailWithTwoAttachments from './invalid-email-with-two-attachments'
import createValidEmailWithCrimesInDifferentTimezones from './valid-email-with-crimes-in-different-time-zones'
import createValidEmailWithInvalidCrimeEmptyPfa from './valid-email-with-invalid-crime-empty-pfa'

const emails: Array<Email> = [
  createInvalidEmailWithIncorrectOriginalSender(),
  createInvalidEmailWithIncorrectResentFrom(),
  createInvalidEmailWithIncorrectSubject(),
  createInvalidEmailWithNoAttachments(),
  createInvalidEmailWithTwoAttachments(),
  createValidEmailWithCrimesInDifferentTimezones(),
  createValidEmailWithInvalidCrimeEmptyPfa()
]

export default emails
