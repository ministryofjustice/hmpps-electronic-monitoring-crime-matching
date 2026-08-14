import { Faker, en_GB, en } from '@faker-js/faker'

const faker = new Faker({ locale: [en_GB, en], seed: 42 })

export default faker
