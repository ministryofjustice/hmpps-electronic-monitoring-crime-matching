import { faker } from '@faker-js/faker'
import Datum from '../../types/datum'

const createRandomLatitude = (datum: Datum): string => {
  if (datum === 'OSGB36') {
    return ''
  }
  return faker.number.float({ min: 49.5, max: 61.5 }).toString()
}

export default createRandomLatitude
