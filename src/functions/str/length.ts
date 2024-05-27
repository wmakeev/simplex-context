import { cast } from '@wmakeev/filtrex'

export function length(val: unknown) {
  return cast.asString(val).length
}
