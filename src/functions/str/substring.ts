import { cast } from '@wmakeev/filtrex'

export function substring(str: unknown, start: unknown, end: unknown) {
  const _str = cast.asString(str)
  const _start = cast.asNumber(start)
  const _end = end != null ? cast.asNumber(end) : undefined

  return _str.substring(_start, _end)
}
