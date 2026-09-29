import DeviceActivation from './deviceActivation'

type DeviceWearer = {
  uniqueDeviceWearerId: string
  firstName: string
  lastName: string
  nomisId: string
  mdssPersonId: number
  pncId: string
  dateOfBirth: Date
  responsibleOfficerName: string
  country: string
  postcode: string
  county: string
  cityOrTown: string
  houseNumberAndStreetName: string
  deviceActivations: Array<DeviceActivation>
}

export default DeviceWearer
