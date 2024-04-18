import { cast } from '@wmakeev/filtrex'

export function reverse(arr: unknown) {
  arr = cast.asArray(arr)

  return (arr as Array<any>).toReversed()
}
