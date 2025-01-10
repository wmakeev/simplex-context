import assert from 'node:assert/strict'
import test from 'node:test'
import { createExpressionContextState } from '../../../src/expressionContext.js'
import { getFunctions } from '../../../src/functions/index.js'

const funcs = getFunctions(createExpressionContextState())

test('Arr:length', () => {
  const length = funcs['Arr:length']

  assert.ok(length)
  assert.equal(length([1, 2, 3]), 3)
})

test('Arr:slice', () => {
  const slice = funcs['Arr:slice']

  assert.ok(slice)

  const arr = [1, 2, 3, 4, 5, 6]

  const sliced = slice(arr)
  assert.ok(arr !== sliced)

  assert.deepEqual(slice(arr, 2), [3, 4, 5, 6])
  assert.deepEqual(slice(arr, 2, 4), [3, 4])
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

test('Arr:includes', () => {
  const includes = funcs['Arr:includes']

  assert.ok(includes)
  assert.deepEqual(includes([1, 2, 3], 2), true)
  assert.deepEqual(includes([1, 2, 3], 42), false)
})

test('Arr:includesFromIndex', () => {
  const includesFromIndex = funcs['Arr:includesFromIndex']

  assert.ok(includesFromIndex)
  assert.deepEqual(includesFromIndex([1, 2, 3], 1, 1), false)
  assert.deepEqual(includesFromIndex([1, 2, 3], 1, 3), true)
})
