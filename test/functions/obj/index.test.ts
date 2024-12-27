import assert from 'node:assert/strict'
import test from 'node:test'
import { createExpressionContextState } from '../../../src/expressionContext.js'
import { getFunctions } from '../../../src/functions/index.js'

const funcs = getFunctions(createExpressionContextState())

test('Obj:fromEntries', () => {
  const fromEntries = funcs['Obj:fromEntries']

  assert.ok(fromEntries)

  assert.deepEqual(
    fromEntries([
      ['a', 1],
      ['b', 'foo'],
      ['c', true]
    ]),
    { a: 1, b: 'foo', c: true }
  )

  assert.deepEqual(fromEntries([['a', 1], [42], ['', 'foo'], ['c', true]]), {
    'a': 1,
    42: undefined,
    '': 'foo',
    'c': true
  })
})

test('Obj:get', () => {
  const get = funcs['Obj:get']

  assert.ok(get)

  assert.equal(get({ a: 'foo' }, 'a'), 'foo')
  assert.equal(get({ a: 'foo' }, 'toString'), undefined)
  assert.equal(get({ a: { b: 'bar' } }, 'a.b'), undefined)
  assert.equal(get([1, 2, 3], 1), 2)
  assert.equal(get([1, 2, 3], '0'), 1)

  assert.throws(() => {
    get(null, 'foo')
  }, /Error in function Obj:get/)

  assert.throws(() => {
    get('', 'foo')
  }, /Error in function Obj:get/)

  assert.throws(() => {
    get({}, {})
  }, /Error in function Obj:get/)
})

test('Obj:toPlainRecord', () => {
  assert.deepEqual(
    funcs['Obj:toPlainRecord']!({
      b: 1,
      a: 'foo',
      y: {
        z: 123,
        m: 'bar'
      },
      n: null
    }),
    { a: 'foo', b: 1, n: 'null', y: '{"m":"bar","z":123}' }
  )
})
