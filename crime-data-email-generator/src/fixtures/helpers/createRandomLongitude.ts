import { faker } from '@faker-js/faker'
import Datum from '../../types/datum'

const createRandomLongitude = (datum: Datum): number | null => {
  if (datum === 'OSGB36') {
    return null
  }
  return faker.number.float({ min: -6, max: 1.9 })
}

export default createRandomLongitude
