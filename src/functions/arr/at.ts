import { cast } from '@wmakeev/filtrex'

export function at(arr: unknown, index: unknown) {
  return cast.asArray(arr).at(cast.asNumber(index))
}
