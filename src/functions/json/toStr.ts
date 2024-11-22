import { typeOf } from '../common/typeOf.js'

// TODO Переименовать на toString?

export function toStr(obj: unknown) {
  const objType = typeOf(obj)

  if (
    objType == null ||
    ![
      'Object',
      'Null',
      'Array',
      'String',
      'Number',
      'Boolean',
      'Date'
    ].includes(objType)
  ) {
    throw new TypeError(`Not supported argument type - ${objType}`)
  }

  return JSON.stringify(obj)
}
