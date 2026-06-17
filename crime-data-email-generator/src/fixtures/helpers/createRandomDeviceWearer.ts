import faker from '../../faker'
import DeviceWearer from '../../types/deviceWearer'

const createRandomDeviceWearer = (overrides: Partial<DeviceWearer> = {}): DeviceWearer => {
  return {
    uniqueDeviceWearerId: faker.string.alphanumeric({ length: 12 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    nomisId: faker.string.alphanumeric({ length: 8 }),
    mdssPersonId: faker.number.int(),
    pncId: faker.string.alphanumeric({ length: 8 }),
    dateOfBirth: faker.date.birthdate(),
    responsibleOfficerName: faker.person.fullName(),
    postcode: faker.location.zipCode(),
    cityOrTown: faker.location.city(),
    houseNumberAndStreetName: faker.location.streetAddress(),
    deviceActivations: [],
    ...overrides,
  }
}

export default createRandomDeviceWearer
