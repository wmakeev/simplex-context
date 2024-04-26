import { cast } from '@wmakeev/filtrex'

export function uniq<T>(arr: Array<T>) {
  arr = cast.asArray(arr)
  return [...new Set(arr)]
}
