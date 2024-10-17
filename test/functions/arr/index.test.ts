import assert from 'node:assert/strict'
import test from 'node:test'
import { createExpressionContextState } from '../../../src/expressionContext.js'
import { getFunctions } from '../../../src/functions/index.js'

const funcs = getFunctions(createExpressionContextState())

test('Arr:coalesce', () => {
  const coalesce = funcs['Arr:coalesce']

  assert.ok(coalesce)
  assert.equal(coalesce([null, undefined, '', 0, 2, null]), 0)
  assert.equal(coalesce([null, undefined, '', false, 2, 42]), false)
})

test('Arr:concat', () => {
  const concat = funcs['Arr:concat']

  assert.ok(concat)
  assert.deepEqual(concat([1, 2, 3], [4, 5], 6, [], [[7], 8]), [
    1,
    2,
    3,
    4,
    5,
    6,
    [7],
    8
  ])

  const emptyArr = concat()
  assert.ok(Array.isArray(emptyArr))
  assert.equal(emptyArr.length, 0)
})
