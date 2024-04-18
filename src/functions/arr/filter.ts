import { cast } from '@wmakeev/filtrex'

export function filter(arr: unknown, fn: unknown) {
  arr = cast.asArray(arr)

  try {
    fn = cast.asFunction(fn)
  } catch (err) {
    throw new Error('Second argument in filter should be function', {
      cause: err
    })
  }

  return (arr as Array<any>).filter(val => (fn as Function)(val))
}
