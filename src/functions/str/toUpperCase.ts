import { typeOf } from '../common/typeOf.js'

export function toUpperCase(val: unknown) {
  if (typeOf(val) === 'string') return (val as string).toUpperCase()
  else return val
}
