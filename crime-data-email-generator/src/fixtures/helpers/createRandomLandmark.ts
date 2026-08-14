import faker from '../../faker'

const landmarks = [
  { latitude: 51.501364, longitude: -0.14189, name: 'Buckingham Palace' },
  { latitude: 51.5033, longitude: -0.1195, name: 'London Eye' },
  { latitude: 51.5155, longitude: -0.1419, name: 'Oxford Circus' },
  { latitude: 51.5138, longitude: -0.0984, name: "St Paul's Cathedral" },
  { latitude: 53.477375, longitude: -2.230929, name: 'Manchester Piccadilly' },
  { latitude: 53.479235, longitude: -2.24458, name: 'Manchester Town Hall' },
  { latitude: 52.47775, longitude: -1.89803, name: 'Birmingham New Street' },
  { latitude: 51.449003, longitude: -2.580982, name: 'Bristol Temple Meads' },
]

const createRandomLandmark = () => faker.helpers.arrayElement(landmarks)

export default createRandomLandmark
