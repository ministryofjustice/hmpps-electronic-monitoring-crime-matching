import faker from '../../faker'

const createRandomCrimeReference = (): string => {
  return faker.string.alphanumeric({ length: 11 })
}

export default createRandomCrimeReference
