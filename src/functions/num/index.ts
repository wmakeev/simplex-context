import { cast } from '@wmakeev/filtrex'

export * from './parse.js'
export * from './toFixed.js'
export * from './range.js'
export * from './round.js'

// export * from '.'

// TODO Num:round(num, 2)

export function floor(num: unknown) {
  return Math.floor(cast.asNumber(num))
}
