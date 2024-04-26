import { UNICODE_SPACES_REGEX } from '../../consts.js'
import { typeOf } from '../common/typeOf.js'

const NUM_REGEX = /(\d[\d,\s]*)((?:\.\d+)?)/

export function parseFloat(num: unknown) {
  const numType = typeOf(num)

  // number
  if (numType === 'number') {
    return Math.floor(num as number)
  }

  // string
  else if (numType === 'string') {
    const numMatch = (num as string)
      .replaceAll(UNICODE_SPACES_REGEX, '')
      .match(NUM_REGEX)

    if (numMatch == null) {
      throw new TypeError(`Can't parse "${num}" string as number`)
    }

    const matchedNum1 = numMatch[1]!
    const matchedNum2 = numMatch[2] ?? ''

    const firstCommaIndex = matchedNum1.indexOf(',')
    const lastCommaIndex = matchedNum1.lastIndexOf(',')

    let strNum = matchedNum1

    // 123456...
    if (firstCommaIndex === -1) {
      strNum = matchedNum1 + (matchedNum2 !== '' ? matchedNum2 : '')
    }

    // 123,456...or 123,456,789...
    else {
      // 123,456.123 or 123,456,789.123
      if (matchedNum2 !== '') {
        strNum = strNum.replaceAll(',', '') + matchedNum2
      }

      // 123,456,789...
      else if (firstCommaIndex !== lastCommaIndex) {
        strNum = strNum.replaceAll(',', '')
      }

      // 123,456
      else {
        strNum = strNum.replace(',', '.')
      }
    }

    const parsed = Number.parseFloat(strNum)

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
