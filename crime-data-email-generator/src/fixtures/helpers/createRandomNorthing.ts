import faker from '../../faker'

const createRandomNorthing = (): number => {
  return faker.number.int({ min: 0, max: 1300000 })
}

export default createRandomNorthing
