import { faker } from '@faker-js/faker'
import PoliceForceArea from '../../types/policeForceArea'
import formatDate from './formatDate'
import lookupPfaShortcode from './lookupPfaShortCode'

// Create a random batch ID with a date within the last year
const createRandomBatchID = (pfa: PoliceForceArea): string => {
  const date = faker.date.past({ years: 1 })
  const pfaShortCode = lookupPfaShortcode(pfa)

  return `${pfaShortCode}${formatDate(date, false)}`
}

export default createRandomBatchID
