import { typeOf } from '../common/typeOf.js'

export function removeExtraSpaces(str: unknown) {
  if (typeOf(str) !== 'string') return str

  // TODO Закешировать? Разобраться.
  return (str as string).replaceAll(
    /[\s\u00A0\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]{2,}/g,
    ' '
  )
}
