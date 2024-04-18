import { typeOf } from '../common/typeOf.js'

export function toLowerCase(val: unknown) {
  if (typeOf(val) === 'string') return (val as string).toLowerCase()
  else return val
}
