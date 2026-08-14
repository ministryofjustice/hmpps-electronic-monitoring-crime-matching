import Crime, { CrimeLike } from './crime'

type CrimeBatch = {
  name: string
  crimes: Array<Crime>
}

type CrimeBatchLike = {
  name: string
  crimes: Array<CrimeLike>
}

export { CrimeBatch, CrimeBatchLike }
