import { faker } from '@faker-js/faker'
import Datum from '../../types/datum'

const createRandomEasting = (datum: Datum): string => {
  if (datum === 'WGS84') {
    return ''
  }
  return faker.number.bigInt({ min: 0, max: 600000 }).toString()
}

export default createRandomEasting
