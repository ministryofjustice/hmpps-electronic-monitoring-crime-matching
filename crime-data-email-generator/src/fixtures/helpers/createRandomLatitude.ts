import faker from '../../faker'

const createRandomLatitude = (): number => {
  return faker.number.float({ min: 49.87, max: 55.81 })
}

export default createRandomLatitude
