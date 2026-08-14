import fs from 'fs'
import { CrimeBatch, CrimeBatchLike } from '../types/batch'
import createCsvFromCrimes from '../fixtures/helpers/createCsvFromCrimes'
import Email from '../types/email'
import createEmailFileContent from './createEmailFileContent'

const createFile = (filename: string, content: string) => {
  fs.writeFileSync(`./output/${filename}`, content, 'utf8')
}

const createCsvFileFromBatch = (batch: CrimeBatch | CrimeBatchLike) => {
  return createFile(`${batch.name}.csv`, createCsvFromCrimes(batch.crimes))
}

const createEmailFile = (email: Email) => {
  return createFile(email.filename, createEmailFileContent(email))
}

export { createFile, createEmailFile, createCsvFileFromBatch }
