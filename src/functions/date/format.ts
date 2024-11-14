import { formatDate } from 'date-fns/format'
import { typeOf } from '../common/typeOf.js'
import { parseISO } from './parseISO.js'

// https://date-fns.org/v4.1.0/docs/format

export function format(date: unknown, format: unknown) {
  if (typeof format !== 'string') {
    throw new TypeError(
      `format argument expected to be string but got - ${typeOf(format)}`
    )
  }

  return formatDate(parseISO(date).toJSON(), format)
}
