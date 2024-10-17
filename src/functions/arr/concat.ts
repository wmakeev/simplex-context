import { cast } from '@wmakeev/filtrex'

export function concat(...args: unknown[]) {
  const arrays = args.map(arg => cast.asArray(arg))
  return ([] as unknown[]).concat(...arrays)
}
