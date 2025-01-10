import { cast } from '@wmakeev/filtrex'
import assert from 'node:assert/strict'

export * from './at.js'
export * from './coalesce.js'
export * from './concat.js'
export * from './filter.js'
export * from './includes.js'
export * from './join.js'
export * from './map.js'
export * from './reverse.js'
export * from './sort.js'
export * from './uniq.js'

export function length(arr: unknown) {
  // TODO Нужно ли позволять передавать не массивы? Должно быть явное поведение.
  assert.ok(Array.isArray(arr), `arr argument expected to be array`)
  return arr.length
}

export function slice(arr: unknown, start: unknown, end: unknown) {
  assert.ok(Array.isArray(arr), `arr argument expected to be array`)

  if (start === undefined) {
    assert.equal(end, undefined)
    return arr.slice()
  }

  if (end === undefined) {
    return arr.slice(cast.asNumber(start))
  }

  return arr.slice(cast.asNumber(start), cast.asNumber(end))
}
