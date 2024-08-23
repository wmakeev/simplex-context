import test from 'node:test'
import assert from 'node:assert/strict'

import * as arr from '../../../src/functions/arr/index.js'

test('arr.parseFloat', () => {
  assert.equal(arr.coalesce([null, undefined, '', 0, 2, null]), 0)
  assert.equal(arr.coalesce([null, undefined, '', false, 2, 42]), false)
})
