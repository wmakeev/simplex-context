export * from './countLeftTabs.js'
export * from './extractNums.js'
export * from './includes.js'
export * from './length.js'
export * from './padEnd.js'
export * from './padStart.js'
export * from './replaceAll.js'
export * from './restrictLength.js'
export * from './split.js'
export * from './startsWith.js'
export * from './substring.js'
export * from './template.js'
export * from './toLowerCase.js'
export * from './toUpperCase.js'
export * from './trim.js'

export function from(val: unknown): string {
  const type = typeof val

  switch (type) {
    case 'string':
    case 'number':
    case 'bigint':
    case 'boolean':
      return String(val)

    case 'object': {
      if (Array.isArray(val)) {
        return `[${val.map(it => from(it)).join()}]`
      }

      if (val instanceof Date) {
        return val.toJSON()
      }

      return '{}'
    }

    case 'undefined':
    case 'function':
    case 'symbol':
    default:
      return ''
  }
}
