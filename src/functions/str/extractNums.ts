import { typeOf } from '../common/typeOf.js'

export function extractNums(val: unknown) {
  if (typeOf(val) === 'string') {
    // TODO Кстати, а нужно ли кешировать такие регулярки?
    return (val as string).replaceAll(/\D/gm, '')
  }

  return val
}
