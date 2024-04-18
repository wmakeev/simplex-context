import { cast } from '@wmakeev/filtrex'

export function split(str: unknown, separator: unknown) {
  return cast.asString(str).split(cast.asString(separator))
}
