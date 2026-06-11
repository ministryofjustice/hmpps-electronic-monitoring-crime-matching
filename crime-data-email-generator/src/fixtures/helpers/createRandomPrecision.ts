import faker from '../../faker'

const createRandomPrecision = (): number => {
  return faker.number.int({ min: 0, max: 25 })
}

export default createRandomPrecision
