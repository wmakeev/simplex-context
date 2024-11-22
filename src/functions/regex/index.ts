import { cast } from '@wmakeev/filtrex'
import { safeRegex } from 'safe-regex2'

// TODO Add regexp cache?
// TODO Use only external predefined RegExps

export function match(pattern: any, value: any) {
  if (typeof pattern !== 'string') {
    throw TypeError('pattern argument should to be string')
  }

  if (safeRegex(pattern) === false) {
    throw new Error(`RegExp "${pattern}" is not safe`)
  }

  return [...(cast.asString(value).match(pattern) ?? [])]
}

export function matchAll(pattern: any, value: any) {
  if (typeof pattern !== 'string') {
    throw TypeError('pattern argument should to be string')
  }

  const regex = new RegExp(pattern, 'gu')

  if (safeRegex(regex) === false) {
    throw new Error(`RegExp "${pattern}" is not safe`)
  }

  const matches = [...(cast.asString(value).matchAll(regex) ?? [])]

  return matches.map(m => Array.from(m))
}

export function test(pattern: any, value: any) {
  if (typeof pattern !== 'string') {
    throw TypeError('pattern argument should to be string')
  }

  const regex = new RegExp(pattern, 'gu')

  if (safeRegex(regex) === false) {
    throw new Error(`RegExp "${pattern}" is not safe`)
  }

  return regex.test(cast.asString(value))
}
