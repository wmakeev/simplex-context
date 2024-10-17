import { cast } from '@wmakeev/filtrex'
import assert from 'node:assert'

export function get(obj: unknown, key: unknown) {
  // TODO Object assertion helper
  assert.ok(obj != null && typeof obj === 'object')
  const _key = cast.asString(key)

  if (Object.hasOwn(obj as object, _key)) {
    // @ts-expect-error skip index signature check
    return obj[_key]
  } else {
    return undefined
  }
}
