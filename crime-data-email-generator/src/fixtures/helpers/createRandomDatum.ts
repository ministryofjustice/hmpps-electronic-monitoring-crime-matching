import { faker } from '@faker-js/faker'
import Datum from '../../types/datum'

const createRandomDatum = (): Datum => {
  return faker.helpers.arrayElement(['WGS84', 'OSGB36'])
}

export default createRandomDatum
