import Email from '../../types/email'
import createEmailWith100Crimes from './email-with-100-crimes'
import createEmailWith1000Crimes from './email-with-1000-crimes'
import createEmailWithCrimeWithMatches from './email-with-crime-with-matches'
import createEmailWithGmtAndBstCrimeDates from './email-with-gmt-and-bst-crime-dates'
import createEmailWithIncorrectOriginalSender from './email-with-incorrect-original-sender'
import createEmailWithIncorrectResentFrom from './email-with-incorrect-resent-from'
import createEmailWithIncorrectSubject from './email-with-incorrect-subject'
import createEmailWithNoAttachments from './email-with-no-attachments'
import createInvalidEmailWithTwoAttachments from './email-with-two-attachments'

const emails: Array<Email> = [
  createEmailWithIncorrectOriginalSender(),
  createEmailWithIncorrectResentFrom(),
  createEmailWithCrimeWithMatches(),
  createEmailWithIncorrectSubject(),
  createEmailWithNoAttachments(),
  createInvalidEmailWithTwoAttachments(),
  createEmailWithGmtAndBstCrimeDates(),
  createEmailWith100Crimes(),
  createEmailWith1000Crimes(),
]

export default emails
