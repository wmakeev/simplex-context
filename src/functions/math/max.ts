import { cast } from '@wmakeev/filtrex'

export function max(...args: unknown[]) {
  let values

  if (args.length === 1 && Array.isArray(args[0])) {
    values = args[0].map(it => cast.asNumber(it))
  } else {
    values = args.map(it => cast.asNumber(it))
  }

  return Math.max(...values)
}
