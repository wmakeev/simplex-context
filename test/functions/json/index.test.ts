import assert from 'node:assert/strict'
import test from 'node:test'
import { createExpressionContextState } from '../../../src/expressionContext.js'
import { getFunctions } from '../../../src/functions/index.js'

const fn = getFunctions(createExpressionContextState())

test('JSON:toStr', () => {
  assert.equal(fn['JSON:toStr']!({ a: 1 }), '{"a":1}')
  assert.equal(fn['JSON:toStr']!([1, 2]), '[1,2]')
  assert.equal(fn['JSON:toStr']!('foo'), '"foo"')
  assert.equal(fn['JSON:toStr']!(42), '42')
  assert.equal(fn['JSON:toStr']!(true), 'true')
  assert.equal(
    fn['JSON:toStr']!(new Date(2024, 0, 1)),
    '"2023-12-31T19:00:00.000Z"'
  )
})

test('JSON:parse', () => {
  assert.deepEqual(fn['JSON:parse']!('{"a":1}'), { a: 1 })
  assert.deepEqual(fn['JSON:parse']!('[1,2]'), [1, 2])
  assert.equal(fn['JSON:parse']!('"foo"'), 'foo')
  assert.equal(fn['JSON:parse']!('42'), 42)
  assert.equal(fn['JSON:parse']!('true'), true)
})
