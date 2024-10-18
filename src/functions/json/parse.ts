import { cast } from '@wmakeev/filtrex'

export function parse(arg: unknown) {
  const jsonStr = cast.asString(arg)
  return JSON.parse(jsonStr)
}
