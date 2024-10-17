import { cast } from '@wmakeev/filtrex'

export function fromEntries(entries: unknown) {
  entries = cast.asArray(entries)
  return Object.fromEntries(entries as Array<any>)
}
