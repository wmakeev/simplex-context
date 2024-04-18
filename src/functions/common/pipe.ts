import { cast } from '@wmakeev/filtrex'

export function pipe(...args: Function[]) {
  args = args.map(a => cast.asFunction(a))

  return (val: unknown) => {
    let result = val

    for (const fn of args) result = fn(result)

    return result
  }
}
