// https://github.com/sindresorhus/pupa
// TODO Убрать и переписать на свой вариант
import pupa from 'pupa'
import { typeOf } from '../common/typeOf.js'

export function template(templ: unknown, ...values: any[]) {
  if (typeOf(templ) !== 'string') {
    throw new TypeError(`template argument should to be string`)
  }

  if (values.length === 1 && Array.isArray(values[0])) {
    return pupa(templ as string, values[0])
  }

  return pupa(templ as string, values)
}
