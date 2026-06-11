import faker from '../../faker'
import Datum from '../../types/datum'

const createRandomLatitude = (datum: Datum): number | null => {
  if (datum === 'OSGB36') {
    return null
  }
  return faker.number.float({ min: 49.87, max: 55.81 })
}

export default createRandomLatitude
