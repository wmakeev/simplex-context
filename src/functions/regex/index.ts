import { cast } from '@wmakeev/filtrex'
import { typeOf } from '../common/typeOf.js'
import { safeRegex } from 'safe-regex2'

// TODO Add regexp cache?

export function match(pattern: any, value: any) {
  if (typeOf(pattern) !== 'string') {
    throw TypeError('pattern argument should to be string')
  }

  if (safeRegex(pattern as string) === false) {
    throw new Error(`RegExp "${pattern}" is not safe`)
  }

  return [...(cast.asString(value).match(pattern) ?? [])]
}

export function matchAll(pattern: any, value: any) {
  if (typeOf(pattern) !== 'string') {
    throw TypeError('pattern argument should to be string')
  }

  if (safeRegex(pattern as string) === false) {
    throw new Error(`RegExp "${pattern}" is not safe`)
  }

  const matches = [...(cast.asString(value).matchAll(pattern) ?? [])]

  return matches.map(m => Array.from(m))
}

export function test(pattern: any, value: any) {
  if (typeOf(pattern) !== 'string') {
    throw TypeError('pattern argument should to be string')
  }

  if (safeRegex(pattern) === false) {
    throw new Error(`RegExp "${pattern}" is not safe`)
  }

  return RegExp(pattern as string).test(cast.asString(value))
}
