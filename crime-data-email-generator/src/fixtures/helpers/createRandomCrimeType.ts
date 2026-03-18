import { faker } from '@faker-js/faker'
import CrimeType from '../../types/crimeType'

const createRandomCrimeType = (): CrimeType => {
  return faker.helpers.arrayElement(['RB', 'BIAD', 'AB', 'BOTD', 'TOMV', 'TFP', 'TFMV'])
}

export default createRandomCrimeType
