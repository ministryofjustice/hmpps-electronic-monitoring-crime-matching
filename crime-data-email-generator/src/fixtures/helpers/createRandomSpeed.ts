import faker from '../../faker'

const createRandomSpeed = (): number => {
  return faker.number.int({ min: 0, max: 70 })
}

export default createRandomSpeed
