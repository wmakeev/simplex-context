import { cast } from '@wmakeev/filtrex'

export function padEnd(str: unknown, len: unknown, fillString: unknown = ' ') {
  return cast
    .asString(str)
    .padEnd(cast.asNumber(len), cast.asString(fillString))
}
