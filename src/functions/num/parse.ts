import { UNICODE_SPACES_REGEX } from '../../consts.js'
import { typeOf } from '../common/typeOf.js'

export function parseFloat(num: unknown) {
  const numType = typeOf(num)

  // number
  if (numType === 'number') {
    return Math.floor(num as number)
  }

  // string
  else if (numType === 'string') {
    const parsed = Number.parseFloat(
      // TODO Подумать над более точным преобразованием
      (num as string).replaceAll(',', '.').replaceAll(UNICODE_SPACES_REGEX, '')
    )

    if (!Number.isFinite(parsed)) {
      throw new TypeError(`Can't parse "${num}" string as number`)
    }

    return parsed
  }

  // other
  else {
    throw new TypeError(`Can't parse ${numType} value as number`)
  }
}

export function parseInt(num: unknown) {
  // TODO Вероятно парсить Int оптимальнее не через Float
  return Math.floor(parseFloat(num))
}

export function tryParseInt<T>(num: unknown, defaultValue: T) {
  try {
    return parseInt(num)
  } catch (err) {
    return defaultValue ?? null
  }
}

export function tryParseFloat<T>(num: unknown, defaultValue: T) {
  try {
    return parseFloat(num)
  } catch (err) {
    return defaultValue ?? null
  }
}
