import { CURRY_PLACEHOLDER } from './functions/curryWrapper.js'
import { functions } from './functions/index.js'
import { TransformExpressionContext } from './types.js'

const expressionDefaultConstants = {
  _: CURRY_PLACEHOLDER,
  TRUE: true,
  FALSE: false
}

export const expressionContext: TransformExpressionContext = {
  symbols: {
    ...expressionDefaultConstants,
    ...functions
  }
}
