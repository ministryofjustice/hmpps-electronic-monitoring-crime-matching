import { CrimeLike } from '../../types/crime'
import { formatDate } from './formatDate'

const createCsvFromCrimes = (crimes: Array<CrimeLike>): string => {
  return crimes
    .map(crime =>
      [
        crime.policeForceArea,
        crime.crimeType,
        crime.crimeTypeDescription,
        crime.batchId,
        crime.crimeReference,
        typeof crime.crimeDateTimeFrom === 'string'
          ? crime.crimeDateTimeFrom
          : formatDate(crime.crimeDateTimeFrom, true),
        typeof crime.crimeDateTimeTo === 'string' ? crime.crimeDateTimeTo : formatDate(crime.crimeDateTimeTo, true),
        crime.easting === null ? '' : crime.easting,
        crime.northing === null ? '' : crime.northing,
        crime.latitude === null ? '' : crime.latitude,
        crime.longitude === null ? '' : crime.longitude,
        crime.datum,
        `"${crime.crimeText}"`,
      ].join(','),
    )
    .join('\n')
}

export default createCsvFromCrimes
