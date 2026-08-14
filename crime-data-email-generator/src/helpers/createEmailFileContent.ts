import Email from '../types/email'
import EmailAttachment from '../types/emailAttachment'

const createAttachment = (attachment: EmailAttachment, boundary: string): Array<string> => {
  return [
    `--${boundary}`,
    `Content-Type: ${attachment.contentType}; name="${attachment.filename}"`,
    `Content-Disposition: attachment; filename="${attachment.filename}"`,
    `Content-Transfer-Encoding: ${attachment.contentTransferEncoding}`,
    '',
    attachment.content,
    '',
  ]
}

const createEmailFileContent = (data: Email): string => {
  const boundary = `----=_Part_${crypto.randomUUID()}`
  const lines = [
    `From: ${data.from}`,
    `Subject: ${data.subject}`,
    `Date: ${data.sentDate}`,
    `MIME-Version: 1.0`,
    `Resent-From: ${data.resentFrom}`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    `Content-Type: text/plain; charset="utf-8"`,
    `Content-Transfer-Encoding: 7bit`,
    '',
    data.body,
    '',
    ...data.attachments.reduce(
      (acc, attachment) => [...acc, ...createAttachment(attachment, boundary)],
      [] as Array<string>,
    ),
    `--${boundary}--`,
    '',
  ]

  return lines.join('\n')
}

export default createEmailFileContent
