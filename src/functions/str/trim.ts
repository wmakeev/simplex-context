import { typeOf } from '../common/typeOf.js'

export function trim(val: unknown) {
  if (typeOf(val) === 'string') return (val as string).trim()
  else return val
}
