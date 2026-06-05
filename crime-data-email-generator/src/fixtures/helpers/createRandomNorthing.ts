import { faker } from '@faker-js/faker'
import Datum from '../../types/datum'

const createRandomNorthing = (datum: Datum): number | null => {
  if (datum === 'WGS84') {
    return null
  }
  return faker.number.int({ min: 0, max: 1300000 })
}

export default createRandomNorthing
