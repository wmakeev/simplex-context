import { parseISO } from './parseISO.js'

export function toJson(date: unknown) {
  return parseISO(date).toJSON()
}
