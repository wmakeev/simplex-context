import assert from 'node:assert'
import { Html } from './Html.js'

export function fromStr(html: unknown) {
  assert.ok(typeof html === 'string')
  return Html.fromString(html)
}

export function find(html: unknown, selector: unknown) {
  assert.ok(html instanceof Html)
  assert.ok(typeof selector === 'string')

  return html.find(selector)
}

export function parent(html: unknown, selector: unknown) {
  assert.ok(html instanceof Html)
  assert.ok(typeof selector === 'string' || selector == null)

  return html.parent(selector ?? undefined)
}

export function next(html: unknown, selector: unknown) {
  assert.ok(html instanceof Html)
  assert.ok(typeof selector === 'string' || selector == null)

  return html.next(selector ?? undefined)
}

export function prev(html: unknown, selector: unknown) {
  assert.ok(html instanceof Html)
  assert.ok(typeof selector === 'string' || selector == null)

  return html.prev(selector ?? undefined)
}

export function toStr(html: unknown) {
  assert.ok(html instanceof Html)

  return html.html()
}

export function asText(html: unknown) {
  assert.ok(html instanceof Html)

  return html.text()
}

export function toArray(html: unknown) {
  assert.ok(html instanceof Html)

  return html.toArray()
}
