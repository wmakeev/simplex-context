import test from 'node:test'
import assert from 'node:assert/strict'

import * as str from '../../../src/functions/str/index.js'

test('str.parseFloat', () => {
  assert.equal(str.template('Foo {0} Bar {1}', 'foo', 'bar'), 'Foo foo Bar bar')

  assert.equal(
    str.template('Foo {0} Bar {1}', ['foo', 'bar']),
    'Foo foo Bar bar'
  )
})

test('str.length', () => {
  assert.throws(() => str.length(undefined))

  // TODO Должна ли быть тут ошибка?
  assert.throws(() => str.length({}))

  assert.equal(str.length('123'), 3)
  assert.equal(str.length(123), 3)
})

test('str.includes', () => {
  assert.throws(() => str.includes('', undefined))
  assert.throws(() => str.includes(null, ''))

  assert.equal(str.includes('abcd', 'bc'), true)
  assert.equal(str.includes('abcd', 'ef'), false)
})
