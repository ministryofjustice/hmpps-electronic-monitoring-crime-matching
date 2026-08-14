const toAthenaTimestamp = (date: Date): string => {
  return `${date.toISOString().slice(0, -1).replace('T', ' ')}000`
}

const toAthenaDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

export { toAthenaDate, toAthenaTimestamp }
