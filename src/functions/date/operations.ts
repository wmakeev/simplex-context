import { cast } from '@wmakeev/filtrex'
import { addDays as _addDays } from 'date-fns/addDays'
import { endOfDay as _endOfDay } from 'date-fns/endOfDay'
import { startOfDay as _startOfDay } from 'date-fns/startOfDay'
import assert from 'node:assert'

export function addDays(date: unknown, amount: unknown) {
  assert.ok(date instanceof Date)

  return _addDays(date, cast.asNumber(amount))
}

export function startOfDay(date: unknown) {
  assert.ok(date instanceof Date)

  return _startOfDay(date)
}

export function endOfDay(date: unknown) {
  assert.ok(date instanceof Date)

  return _endOfDay(date)
}
