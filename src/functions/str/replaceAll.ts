import { cast } from '@wmakeev/filtrex'

export function replaceAll(
  str: unknown,
  searchValue: unknown,
  replaceValue: unknown
) {
  if (typeof str === 'string') {
    return str.replaceAll(
      cast.asString(searchValue),
      cast.asString(replaceValue)
    )
  } else {
    return str
  }
}
