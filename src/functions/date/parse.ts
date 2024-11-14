import { parse as parseDate } from 'date-fns/parse'
import { typeOf } from '../common/typeOf.js'

// https://date-fns.org/v4.1.0/docs/parse

export function parse(date: unknown, format: unknown): Date {
  // date
  if (typeof date !== 'string') {
    throw new TypeError(
      `date argument expected to be string but got - ${typeOf(date)}`
    )
  }

  // format
  if (typeof format !== 'string') {
    throw new TypeError(
      `format argument expected to be string but got - ${typeOf(format)}`
    )
  }

  return parseDate(date, format, new Date(0))
}

export function tryParse<T>(date: unknown, format: unknown, defaultValue: T) {
  try {
    return parse(date, format)
  } catch (err) {
    return defaultValue ?? null
  }
}
