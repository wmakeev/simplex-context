import { CURRY_PLACEHOLDER } from './functions/curryWrapper.js'
import { getFunctions } from './functions/index.js'
import {
  TransformExpressionContext,
  TransformExpressionState
} from './types.js'

const expressionDefaultConstants = {
  _: CURRY_PLACEHOLDER,
  TRUE: true,
  FALSE: false
}

export const EXPRESSION_STATE = Symbol('EXPRESSION_STATE')

export function createExpressionContext(): TransformExpressionContext {
  const state: TransformExpressionState = {
    SETS_MAP: new Map<string, Set<any>>()
  }

  const functions = getFunctions(state)

  return {
    symbols: {
      ...expressionDefaultConstants,
      ...functions
    }
  }
}
