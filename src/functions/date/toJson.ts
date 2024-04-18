import { parseDate } from './parse.js'

export function toJson(date: unknown) {
  return parseDate(date).toJSON()
}
