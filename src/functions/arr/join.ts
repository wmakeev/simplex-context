import { cast } from '@wmakeev/filtrex'

export function join<T>(arr: Array<T>, separator: string = ',') {
  arr = cast.asArray(arr)
  separator = cast.asString(separator)

  return arr.join(separator)
}
