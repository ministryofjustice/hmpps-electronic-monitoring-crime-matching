import Crime from '../../types/crime'
import createCsvFromCrimes from './createCsvFromCrimes'

const createBase64CsvFromCrimes = (crimes: Array<Crime>) => {
  return Buffer.from(createCsvFromCrimes(crimes), 'utf8').toString('base64')
}

export default createBase64CsvFromCrimes
