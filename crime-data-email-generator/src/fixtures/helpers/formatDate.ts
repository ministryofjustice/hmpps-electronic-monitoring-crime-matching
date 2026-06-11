const formatDate = (date: Date, includeTime: boolean): string => {
  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')
  const datePart = `${year}${month}${day}`

  if (includeTime) {
    return `${datePart}${hours}${minutes}${seconds}`
  }

  return datePart
}

const formatAthenaTimestamp = (date: Date | null) => {
  if (date == null) {
    return ''
  }

  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`
}

const formatDateOfBirth = (date: Date) => {
  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export { formatDate, formatDateOfBirth, formatAthenaTimestamp }
