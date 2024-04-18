import { cast } from '@wmakeev/filtrex'
import { typeOf } from '../common/typeOf.js'

export function replaceAll(
  str: unknown,
  searchValue: unknown,
  replaceValue: unknown
) {
  if (typeOf(str) === 'string') {
    return (str as string).replaceAll(
      cast.asString(searchValue),
      cast.asString(replaceValue)
    )
  } else {
    return str
  }
}
