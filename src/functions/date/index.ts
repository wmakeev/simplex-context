import { parseISO } from './parseISO.js'

export * from './format.js'
export * from './parse.js'
export * from './parseISO.js'
export * from './toJson.js'

export function getYear(...args: any[]) {
  return args.length === 0
    ? new Date().getFullYear()
    : parseISO(args[0]).getFullYear()
}

export function getMonth(...args: any[]) {
  return args.length === 0
    ? new Date().getMonth() + 1
    : parseISO(args[0]).getMonth() + 1
}

export function getDate(...args: any[]) {
  return args.length === 0 ? new Date().getDate() : parseISO(args[0]).getDate()
}

export function getWeekDay(...args: any[]) {
  return args.length === 0 ? new Date().getDay() : parseISO(args[0]).getDay()
}

export function getHours(...args: any[]) {
  return args.length === 0
    ? new Date().getHours()
    : parseISO(args[0]).getHours()
}

export function getMinutes(...args: any[]) {
  return args.length === 0
    ? new Date().getMinutes()
    : parseISO(args[0]).getMinutes()
}

export function getSeconds(...args: any[]) {
  return args.length === 0
    ? new Date().getSeconds()
    : parseISO(args[0]).getSeconds()
}

export function getMilliseconds(...args: any[]) {
  return args.length === 0
    ? new Date().getMilliseconds()
    : parseISO(args[0]).getMilliseconds()
}

export function getTimestamp(...args: any[]) {
  return args.length === 0 ? new Date().getTime() : parseISO(args[0]).getTime()
}

export function now() {
  return Date.now()
}
