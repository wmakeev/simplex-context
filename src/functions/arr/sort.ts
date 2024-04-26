import { cast } from '@wmakeev/filtrex'

export function sort(arr: unknown, compareFn: unknown) {
  arr = cast.asArray(arr)

  try {
    if (compareFn !== undefined) compareFn = cast.asFunction(compareFn)
  } catch (err) {
    throw new Error('Second compare function argument should be function', {
      cause: err
    })
  }

  return (arr as Array<any>).concat().sort(compareFn as any)
}
