import { faker } from '@faker-js/faker'
import PoliceForceArea from '../../types/policeForceArea'

const createRandomPFA = (): PoliceForceArea => {
  return faker.helpers.arrayElement([
    'Avon and Somerset',
    'Bedfordshire',
    'Cheshire',
    'City of London',
    'Cumbria',
    'Derbyshire',
    'Durham',
    'Essex',
    'Gloucestershire',
    'Gwent',
    'Hampshire',
    'Hertfordshire',
    'Humberside',
    'Kent',
    'Metropolitan',
    'North Wales',
    'Nottinghamshire',
    'Sussex',
    'West Midlands',
  ])
}

export default createRandomPFA
