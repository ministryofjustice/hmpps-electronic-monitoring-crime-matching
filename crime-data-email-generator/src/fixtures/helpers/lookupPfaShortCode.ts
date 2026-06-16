import PoliceForceArea from '../../types/policeForceArea'

const lookupPfaShortcode = (pfa: PoliceForceArea): string => {
  const shortCodeMap: Record<PoliceForceArea, string> = {
    'Avon and Somerset': 'AVS',
    Bedfordshire: 'BFD',
    Cheshire: 'CHS',
    CoLP: 'CoLP',
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
    NorthWales: 'NWL',
    Nottinghamshire: 'NOT',
    Sussex: 'SXP',
    WestMidlands: 'WMP',
  }

  return shortCodeMap[pfa]
}

export default lookupPfaShortcode
