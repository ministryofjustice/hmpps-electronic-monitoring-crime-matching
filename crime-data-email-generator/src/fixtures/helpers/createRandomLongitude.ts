import faker from '../../faker'

const createRandomLongitude = (): number => {
  return faker.number.float({ min: -6, max: 1.9 })
}

export default createRandomLongitude
