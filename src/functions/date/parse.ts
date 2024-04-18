import { typeOf } from '../common/typeOf.js'

export function parseDate(date: unknown): Date {
  const dateType = typeOf(date)

  // date
  if (dateType === 'date') {
    return date as Date
  }

  // string
  else if (dateType === 'string') {
    const parsedDate = new Date(date as string)

    if (Number.isNaN(parsedDate.getTime())) {
      throw new TypeError(`Incorrect date format - "${date}"`)
    }

    return parsedDate
  }

  // number
  else if (dateType === 'number') {
    return new Date(date as number)
  }

  // other
  else {
    throw new TypeError(`Can't convert ${dateType} to date`)
  }
}

export function tryParseDate<T>(date: unknown, defaultValue: T) {
  try {
    return parseDate(date)
  } catch (err) {
    return defaultValue ?? null
  }
}
