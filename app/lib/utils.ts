import { customAlphabet } from 'nanoid'

export const generateProjectCode = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '') // YYYYMMDD
  const randomPart = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 3)() // 6 char alfanum.
  return `PRJ${datePart}${randomPart}`
}


