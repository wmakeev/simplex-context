import { cast } from '@wmakeev/filtrex'

export function startsWith(str: unknown, value: unknown) {
  return cast.asString(str).startsWith(cast.asString(value))
}
