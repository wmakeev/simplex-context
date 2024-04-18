import { cast } from '@wmakeev/filtrex'

export function range(size: unknown, from = 1, step = 1) {
  const range = [] as number[]

  for (
    let i = cast.asNumber(from),
      len = cast.asNumber(size),
      step_ = cast.asNumber(step);
    i <= len;
    i += step_
  ) {
    range.push(i)
  }

  return range
}
