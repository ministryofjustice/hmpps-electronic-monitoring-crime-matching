import faker from '../../faker'
import DeviceActivation from '../../types/deviceActivation'

const createRandomDeviceActivation = (): DeviceActivation => {
  const activationDate = faker.date.between({ from: '2025-01-01', to: '2025-12-31' })
  // Orders can be up to a year. Orders may not have finished (i.e. no deactivation date)
  const deactivationDate = faker.helpers.arrayElement([
    faker.date.soon({
      days: 365,
      refDate: activationDate,
    }),
    null,
  ])

  return {
    device_activation_date: activationDate,
    device_deactivation_date: deactivationDate,
    device_activation_id: faker.number.int(),
    device_id: faker.number.int(),
    positions: [],
  }
}

export default createRandomDeviceActivation
