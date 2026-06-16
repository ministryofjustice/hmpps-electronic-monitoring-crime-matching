import faker from '../../faker'
import { WALKING_SPEED_METRES_PER_SECOND_MAX, WALKING_SPEED_METRES_PER_SECOND_MIN } from '../constants'

const createRandomWalkingSpeed = () => {
  return faker.number.float({
    min: WALKING_SPEED_METRES_PER_SECOND_MIN,
    max: WALKING_SPEED_METRES_PER_SECOND_MAX,
    fractionDigits: 1,
  })
}

export default createRandomWalkingSpeed
