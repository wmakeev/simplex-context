import assert from 'node:assert/strict'
import test from 'node:test'
import { createExpressionContextState } from '../../../src/expressionContext.js'
import { getFunctions } from '../../../src/functions/index.js'

const fn = getFunctions(createExpressionContextState())

test('Op:*', () => {
  assert.equal(fn['Op:eq']!(1, 1), true)
  assert.equal(fn['Op:eq']!(1, 0), false)

  assert.equal(fn['Op:gt']!(2, 1), true)
  assert.equal(fn['Op:gt']!(1, 1), false)

  assert.equal(fn['Op:gte']!(2, 1), true)
  assert.equal(fn['Op:gte']!(2, 2), true)
  assert.equal(fn['Op:gte']!(1, 2), false)

  assert.equal(fn['Op:lt']!(1, 2), true)
  assert.equal(fn['Op:lt']!(2, 1), false)

  assert.equal(fn['Op:lte']!(1, 2), true)
  assert.equal(fn['Op:lte']!(2, 2), true)
  assert.equal(fn['Op:lte']!(2, 1), false)

  assert.equal(fn['Op:neq']!(2, 1), true)
  assert.equal(fn['Op:neq']!(1, 1), false)

  assert.equal(fn['Op:not']!(true), false)
  assert.equal(fn['Op:not']!(false), true)
  assert.equal(fn['Op:not']!(''), true)
  assert.equal(fn['Op:not']!(0), true)
  assert.equal(fn['Op:not']!(1), false)
})
