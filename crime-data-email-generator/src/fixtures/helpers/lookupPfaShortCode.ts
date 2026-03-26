import PoliceForceArea from '../../types/policeForceArea'

const lookupPfaShortcode = (pfa: PoliceForceArea): string => {
  const shortCodeMap: Record<PoliceForceArea, string> = {
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

  return shortCodeMap[pfa]
}

export default lookupPfaShortcode
