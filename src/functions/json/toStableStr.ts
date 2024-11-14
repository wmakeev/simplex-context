import { typeOf } from '../common/typeOf.js'
import { stringify } from 'safe-stable-stringify'

export function toStableStr(obj: unknown) {
  const objType = typeOf(obj)

  if (
    objType == null ||
    !['object', 'array', 'string', 'number', 'boolean', 'date'].includes(
      objType
    )
  ) {
    throw new TypeError(`Not supported argument type - ${objType}`)
  }

  return stringify(obj)
}
