import { UNICODE_SPACES_REGEX } from '../../consts.js'
import { typeOf } from '../common/typeOf.js'

export function toFixed(num: unknown, fractionDigits = 2) {
  const numType = typeOf(num)

  // number
  if (numType === 'number') {
    return (num as number).toFixed(fractionDigits)
  }

  // string
  else if (numType === 'string') {
    const parsed = Number.parseFloat(
      (num as string).replaceAll(',', '.').replaceAll(UNICODE_SPACES_REGEX, '')
    )

    if (Number.isNaN(parsed)) {
      throw new TypeError(`Can't convert "${num}" to number`)
    }

    return parsed.toFixed(fractionDigits)
  }

  throw new TypeError(`Expected number argument but got ${numType}`)
}
