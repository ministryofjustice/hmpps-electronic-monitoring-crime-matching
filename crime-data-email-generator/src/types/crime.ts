import CrimeType from './crimeType'
import Datum from './datum'
import PoliceForceArea from './policeForceArea'

/**
 * Strictly typed Crime type
 */
type Crime = {
  policeForceArea: PoliceForceArea
  crimeType: CrimeType
  crimeTypeDescription: string
  batchId: string
  crimeReference: string
  crimeDateTimeFrom: Date
  crimeDateTimeTo: Date
  easting: number | null
  northing: number | null
  latitude: number | null
  longitude: number | null
  datum: Datum
  crimeText: string
}

/**
 * Loosely typed Crime type that allows invalid values
 */
export type CrimeLike = Omit<Crime, 'crimeType' | 'policeForceArea' | 'crimeDateTimeFrom' | 'crimeDateTimeTo'> & {
  policeForceArea: string
  crimeType: string
  crimeDateTimeFrom: Date | string
  crimeDateTimeTo: Date | string
}

export default Crime
