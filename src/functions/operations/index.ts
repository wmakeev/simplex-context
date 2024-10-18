import { cast } from '@wmakeev/filtrex'

export const eq = (a: unknown, b: unknown) => {
  return a === b
}

export const neq = (a: unknown, b: unknown) => {
  return a !== b
}

export const not = (a: unknown) => {
  /* eslint @typescript-eslint/strict-boolean-expressions:0 */
  return !a
}

export const gt = (a: unknown, b: unknown) => {
  const _a = cast.asSimple(a)
  const _b = cast.asSimple(b)

  return _a > _b
}

export const gte = (a: unknown, b: unknown) => {
  const _a = cast.asSimple(a)
  const _b = cast.asSimple(b)

  return _a >= _b
}

export const lt = (a: unknown, b: unknown) => {
  const _a = cast.asSimple(a)
  const _b = cast.asSimple(b)

  return _a < _b
}

export const lte = (a: unknown, b: unknown) => {
  const _a = cast.asSimple(a)
  const _b = cast.asSimple(b)

  return _a <= _b
}
