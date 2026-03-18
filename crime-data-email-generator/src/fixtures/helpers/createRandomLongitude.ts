import { faker } from '@faker-js/faker'
import Datum from '../../types/datum'

const createRandomLongitude = (datum: Datum): string => {
  if (datum === 'OSGB36') {
    return ''
  }
  return faker.number.float({ min: -8.5, max: 2.6 }).toString()
}

export default createRandomLongitude
