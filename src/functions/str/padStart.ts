import { cast } from '@wmakeev/filtrex'

export function padStart(
  str: unknown,
  len: unknown,
  fillString: unknown = ' '
) {
  return cast
    .asString(str)
    .padStart(cast.asNumber(len), cast.asString(fillString))
}
