import { cast } from '@wmakeev/filtrex'

export function includes(val: unknown, searchString: unknown) {
  return cast.asString(val).includes(cast.asString(searchString))
}
