import { faker } from '@faker-js/faker'
import Datum from '../../types/datum'

const createRandomEasting = (datum: Datum): number | null => {
  if (datum === 'WGS84') {
    return null
  }
  return faker.number.int({ min: 0, max: 600000 })
}

export default createRandomEasting
