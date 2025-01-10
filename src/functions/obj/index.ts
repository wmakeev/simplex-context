import assert from 'node:assert/strict'
import { typeOf } from '../common/typeOf.js'

export * from './fromEntries.js'
export * from './get.js'
export * from './toPlainRecord.js'

export function assign(...args: unknown[]) {
  assert.ok(args.length > 0, 'expected objects arguments')
  assert.ok(
    args.every(it => typeOf(it) === 'Object', 'expected objects arguments')
  )

  return Object.assign({}, ...args)
}
