import faker from '../../faker'

const createRandomDirection = (): number => {
  return faker.number.int({ min: 0, max: 360 })
}

export default createRandomDirection
