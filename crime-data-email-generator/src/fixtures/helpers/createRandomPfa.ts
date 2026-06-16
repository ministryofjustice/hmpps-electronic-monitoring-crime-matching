import faker from '../../faker'
import PoliceForceArea from '../../types/policeForceArea'

const createRandomPFA = (): PoliceForceArea => {
  return faker.helpers.arrayElement([
    'Avon and Somerset',
    'Bedfordshire',
    'Cheshire',
    'CoLP',
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
    'NorthWales',
    'Nottinghamshire',
    'Sussex',
    'WestMidlands',
  ])
}

export default createRandomPFA
