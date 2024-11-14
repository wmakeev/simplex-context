import { typeOf } from '../common/typeOf.js'

export function parseISO(date: unknown): Date {
  // date
  if (date instanceof Date) {
    return date as Date
  }

  // string
  if (typeof date === 'string') {
    const parsedDate = new Date(date as string)

    if (Number.isNaN(parsedDate.getTime())) {
      throw new TypeError(`Incorrect date string - "${date}"`)
    }

    return parsedDate
  }

  // number
  else if (typeof date === 'number') {
    return new Date(date as number)
  }

  // other
  else {
    throw new TypeError(`Can't convert ${typeOf(date)} to date`)
  }
}

export function tryParseISO<T>(date: unknown, defaultValue: T) {
  try {
    return parseISO(date)
  } catch (err) {
    return defaultValue ?? null
  }
}
