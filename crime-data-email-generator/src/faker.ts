// eslint-disable-next-line camelcase
import { Faker, en_GB, en } from '@faker-js/faker'

// eslint-disable-next-line camelcase
const faker = new Faker({ locale: [en_GB, en], seed: 42 })

export default faker
