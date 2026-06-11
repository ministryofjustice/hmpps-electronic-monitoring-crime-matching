const GeolocationMechanisms = {
  GPS: 1,
  RF: 4,
  LBS: 5,
  WIFI: 6,
} as const

type GeolocationMechanism = (typeof GeolocationMechanisms)[keyof typeof GeolocationMechanisms]

export { GeolocationMechanisms }

export default GeolocationMechanism
