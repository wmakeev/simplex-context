// https://github.com/sindresorhus/pupa
// TODO Убрать и переписать на свой вариант
import pupa from 'pupa'

export function template(templ: unknown, ...values: any[]) {
  if (typeof templ !== 'string') {
    throw new TypeError(`template argument should to be string`)
  }

  if (values.length === 1 && Array.isArray(values[0])) {
    return pupa(templ, values[0])
  }

  return pupa(templ, values)
}
