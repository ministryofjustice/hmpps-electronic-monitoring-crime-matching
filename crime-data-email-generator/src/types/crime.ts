import CrimeType from './crimeType'
import { WGS84, OSGB36 } from './datum'
import PoliceForceArea from './policeForceArea'

/**
 * Strictly typed Crime type
 */
type WGS84Crime = {
  policeForceArea: PoliceForceArea
  crimeType: CrimeType
  crimeTypeDescription: string
  batchId: string
  crimeReference: string
  crimeDateTimeFrom: Date
  crimeDateTimeTo: Date
  easting: null
  northing: null
  latitude: number
  longitude: number
  datum: WGS84
  crimeText: string
}

type OSGB36Crime = {
  policeForceArea: PoliceForceArea
  crimeType: CrimeType
  crimeTypeDescription: string
  batchId: string
  crimeReference: string
  crimeDateTimeFrom: Date
  crimeDateTimeTo: Date
  easting: number
  northing: number
  latitude: null
  longitude: null
  datum: OSGB36
  crimeText: string
}

type Crime = WGS84Crime | OSGB36Crime

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
