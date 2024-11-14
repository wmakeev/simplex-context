import { parseISO } from './parseISO.js'

export * from './format.js'
export * from './parse.js'
export * from './parseISO.js'
export * from './toJson.js'

export function getYear(date: unknown) {
  return parseISO(date).getFullYear()
}

export function getMonth(date: unknown) {
  return parseISO(date).getMonth() + 1
}

export function getDate(date: unknown) {
  return parseISO(date).getDate()
}

export function getWeekDay(date: unknown) {
  return parseISO(date).getDay()
}

export function getHours(date: unknown) {
  return parseISO(date).getHours()
}

export function getMinutes(date: unknown) {
  return parseISO(date).getMinutes()
}

export function getSeconds(date: unknown) {
  return parseISO(date).getSeconds()
}

export function getMilliseconds(date: unknown) {
  return parseISO(date).getMilliseconds()
}

export function getTimestamp(date: unknown) {
  return parseISO(date).getTime()
}
