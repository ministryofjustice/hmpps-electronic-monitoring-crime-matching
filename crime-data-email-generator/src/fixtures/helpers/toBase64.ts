const toBase64 = (content: string) => {
  return Buffer.from(content, 'utf8').toString('base64')
}

export default toBase64
