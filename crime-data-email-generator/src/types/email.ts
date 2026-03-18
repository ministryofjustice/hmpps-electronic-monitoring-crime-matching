import EmailAttachment from './emailAttachment'

type Email = {
  attachments: Array<EmailAttachment>
  body: string
  filename: string
  from: string
  resentFrom: string
  sentDate: string
  subject: string
}

export default Email
