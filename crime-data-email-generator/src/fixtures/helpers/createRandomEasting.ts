import faker from '../../faker'

const createRandomEasting = (): number => {
  return faker.number.int({ min: 0, max: 600000 })
}

export default createRandomEasting
