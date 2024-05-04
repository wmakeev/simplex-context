import { cast } from '@wmakeev/filtrex'

export function map(arr: unknown, fn: unknown) {
  arr = cast.asArray(arr)

  try {
    fn = cast.asFunction(fn)
  } catch (err) {
    throw new Error('second argument should to be function', {
      cause: err
    })
  }

  return (arr as Array<any>).map(val => (fn as Function)(val))
}
