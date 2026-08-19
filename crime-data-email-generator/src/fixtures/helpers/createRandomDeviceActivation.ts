import faker from '../../faker'
import DeviceActivation from '../../types/deviceActivation'

const createRandomDeviceActivation = (overrides: Partial<DeviceActivation> = {}): DeviceActivation => {
  const activationDate = faker.date.between({ from: '2025-01-01', to: '2025-12-31' })
  // Orders can be up to a year. Orders may not have finished (i.e. no deactivation date)
  const deactivationDate = faker.helpers.arrayElement([
    faker.date.soon({
      days: 365,
      refDate: activationDate,
    }),
    new Date('2999-12-12T23:59:59.000Z'), // 12/12/2999 23:59:59 - Datastore sentinel value for device activation with no end data
  ])

  return {
    device_activation_date: activationDate,
    device_deactivation_date: deactivationDate,
    device_activation_id: faker.number.int(),
    device_serial_number: parseInt(faker.string.numeric({ length: 9, allowLeadingZeros: false }), 10),
    device_id: faker.number.int(),
    personId: faker.number.int(),
    positions: [],
    ...overrides,
  }
}

export default createRandomDeviceActivation
