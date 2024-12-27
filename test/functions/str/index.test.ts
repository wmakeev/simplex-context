import test from 'node:test'
import assert from 'node:assert/strict'
import { createExpressionContextState } from '../../../src/expressionContext.js'
import { getFunctions } from '../../../src/functions/index.js'

const fn = getFunctions(createExpressionContextState())

test('Str:template', () => {
  assert.equal(
    fn['Str:template']!('Foo {0} Bar {1}', 'foo', 'bar'),
    'Foo foo Bar bar'
  )

  assert.equal(
    fn['Str:template']!('Foo {0} Bar {1}', ['foo', 'bar']),
    'Foo foo Bar bar'
  )
})

test('Str:length', () => {
  assert.throws(() => fn['Str:length']!(undefined))

  // TODO Должна ли быть тут ошибка?
  assert.throws(() => fn['Str:length']!({}))

  assert.equal(fn['Str:length']!('123'), 3)
  assert.equal(fn['Str:length']!(123), 3)
})

test('Str:includes', () => {
  assert.throws(() => fn['Str:includes']!('', undefined))
  assert.throws(() => fn['Str:includes']!(null, ''))

  assert.equal(fn['Str:includes']!('abcd', 'bc'), true)
  assert.equal(fn['Str:includes']!('abcd', 'ef'), false)
})

test('Str:toUpperCase', () => {
  assert.equal(fn['Str:toUpperCase']!('abcd'), 'ABCD')
})

test('Str:toLowerCase', () => {
  assert.equal(fn['Str:toLowerCase']!('aBcd'), 'abcd')
})

test('Str:substring', () => {
  assert.equal(fn['Str:substring']!('aBcdef', 2), 'cdef')
  assert.equal(fn['Str:substring']!('aBcdef', 2, 5), 'cde')
  assert.equal(fn['Str:substring']!('aBcdef', 2, -1), 'aB') // ?
})

test('Str:pad*', () => {
  assert.equal(fn['Str:padStart']!(1, 3, '0'), '001')
  assert.equal(fn['Str:padStart']!(1, 3), '  1')

  assert.equal(fn['Str:padEnd']!(1, 3, '0'), '100')
  assert.equal(fn['Str:padEnd']!('1', 3), '1  ')
})

test('Str:restrictLength', () => {
  const restrictLength = fn['Str:restrictLength']
  assert.ok(restrictLength)

  assert.equal(
    restrictLength('Hello world I am long string!', 1000),
    'Hello world I am long string!'
  )

  assert.equal(
    restrictLength('Hello world I am long string!', 10),
    'Hello w...'
  )

  assert.equal(
    restrictLength('Hello world I am long string!', 10, '*'),
    'Hello wor*'
  )
})
