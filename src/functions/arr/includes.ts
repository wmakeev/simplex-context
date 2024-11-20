import { cast } from '@wmakeev/filtrex'

export function includes(arr: unknown, val: unknown) {
  return cast.asArray(arr).includes(val)
}

export function includesFromIndex(arr: unknown, index: unknown, val: unknown) {
  return cast.asArray(arr).includes(val, cast.asNumber(index))
}
