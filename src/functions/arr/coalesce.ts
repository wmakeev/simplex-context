import { cast } from '@wmakeev/filtrex'

export function coalesce<T>(arr: Array<T>) {
  arr = cast.asArray(arr)

  // TODO export empty from filtrex
  return arr.find(it => it != null && it !== '') ?? null
}
