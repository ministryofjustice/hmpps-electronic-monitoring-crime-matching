import Crime from '../../types/crime'

const createCsvFromCrimes = (crimes: Array<Crime>): string => {
  return crimes
    .map(crime =>
      [
        crime.policeForceArea,
        crime.crimeType,
        crime.crimeTypeDescription,
        crime.batchId,
        crime.crimeReference,
        crime.crimeDateTimeFrom,
        crime.crimeDateTimeTo,
        crime.easting,
        crime.northing,
        crime.latitude,
        crime.longitude,
        crime.datum,
        `"${crime.crimeText}"`,
      ].join(','),
    )
    .join('\n')
}

export default createCsvFromCrimes
