import { faker } from '@faker-js/faker'
import PoliceForceArea from '../../types/policeForceArea'
import formatDate from './formatDate'

// Create a random batch ID with a date within the last year
const createRandomBatchID = (pfa: PoliceForceArea): string => {
  const date = faker.date.past({ years: 1 })
  const pfaShortCodeMap: Record<PoliceForceArea, string> = {
    'Avon and Somerset': 'AVS',
    Bedfordshire: 'BFD',
    Cheshire: 'CHS',
    'City of London': 'CoLP',
    Cumbria: 'CMB',
    Derbyshire: 'DBY',
    Durham: 'DUR',
    Essex: 'ESX',
    Gloucestershire: 'GLC',
    Gwent: 'GWP',
    Hampshire: 'HAM',
    Hertfordshire: 'HRT',
    Humberside: 'HMB',
    Kent: 'KNT',
    Metropolitan: 'MPS',
    'North Wales': 'NWL',
    Nottinghamshire: 'NOT',
    Sussex: 'SXP',
    'West Midlands': 'WMP',
  }

  return `${pfaShortCodeMap[pfa]}${formatDate(date, false)}`
}

export default createRandomBatchID
