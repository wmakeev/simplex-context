import { typeOf } from '../common/typeOf.js'
import { stringify } from 'safe-stable-stringify'

export function toPlainRecord(obj: unknown) {
  if (typeOf(obj) !== 'object') {
    throw new TypeError(`Not supported argument type - ${typeOf(obj)}`)
  }

  const entries = Object.getOwnPropertyNames(
    obj as Record<string, unknown>
  ).map(key => {
    const val = (obj as Record<string, unknown>)[key]

    return [key, typeof val === 'object' ? stringify(val) : val] as [
      string,
      unknown
    ]
  })

  return Object.fromEntries(entries)
}
