import faker from '../../faker'
import DeviceWearer from '../../types/deviceWearer'

const createRandomDeviceWearer = (): DeviceWearer => {
  return {
    uniqueDeviceWearerId: faker.string.alphanumeric({ length: 12 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    nomisId: faker.string.alphanumeric({ length: 8 }),
    pncId: faker.string.alphanumeric({ length: 8 }),
    dateOfBirth: faker.date.birthdate(),
    responsibleOfficerName: faker.person.fullName(),
    postcode: faker.location.zipCode(),
    cityOrTown: faker.location.city(),
    houseNumberAndStreetName: faker.location.streetAddress(),
    deviceActivations: [],
  }
}

export default createRandomDeviceWearer
