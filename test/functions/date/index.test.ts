import test from 'node:test'
import assert from 'node:assert/strict'
import { createExpressionContextState } from '../../../src/expressionContext.js'
import { getFunctions } from '../../../src/functions/index.js'

const fn = getFunctions(createExpressionContextState())

test('Date:*', () => {
  const date = fn['Date:ISO:parse']!('2024-01-05T13:52:33.123Z')

  assert.equal(date.toJSON(), '2024-01-05T13:52:33.123Z')

  assert.equal(fn['Date:getYear']!(date), 2024)
  assert.equal(fn['Date:getMonth']!(date), 1)
  assert.equal(fn['Date:getDate']!(date), 5)
  assert.equal(fn['Date:getWeekDay']!(date), 5)
  assert.equal(fn['Date:getHours']!(date), 13)
  assert.equal(fn['Date:getMinutes']!(date), 52)
  assert.equal(fn['Date:getSeconds']!(date), 33)
  assert.equal(fn['Date:getMilliseconds']!(date), 123)
  assert.equal(fn['Date:getTimestamp']!(date), 1704462753123)
  assert.equal(typeof fn['Date:now']!(), 'number')

  assert.equal(fn['Date:format']!(date, 'yyyy-MM-dd'), '2024-01-05')

  assert.equal(
    fn['Date:parse']!('2024-01-05', 'yyyy-MM-dd').toJSON(),
    '2024-01-05T00:00:00.000Z'
  )
})
