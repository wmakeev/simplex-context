import { typeOf } from '../common/typeOf.js'

// TODO Переименовать на toString?

export function toStr(obj: unknown) {
  const objType = typeOf(obj)

  if (
    objType == null ||
    !['object', 'array', 'string', 'number', 'boolean', 'date'].includes(
      objType
    )
  ) {
    throw new TypeError(`Not supported argument type - ${objType}`)
  }

  return JSON.stringify(obj)
}
