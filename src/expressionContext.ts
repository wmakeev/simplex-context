import { CURRY_PLACEHOLDER } from './functions/curryWrapper.js'
import { getFunctions } from './functions/index.js'
import {
  TransformExpressionContext,
  TransformExpressionState
} from './types.js'

const expressionDefaultConstants = {
  _: CURRY_PLACEHOLDER,
  EMPTY: null,
  TRUE: true,
  FALSE: false
}

export const EXPRESSION_STATE = Symbol('EXPRESSION_STATE')

export const createExpressionContextState = () => {
  const state: TransformExpressionState = {
    SETS_MAP: new Map(),
    MAPS_MAP: new Map()
  }

  return state
}

export function createExpressionContext(
  extendedContext?: TransformExpressionContext
): TransformExpressionContext {
  const state = createExpressionContextState()

  const functions = getFunctions(state)

  return {
    ...extendedContext,
    symbols: {
      ...functions,
      ...extendedContext?.symbols,
      ...expressionDefaultConstants
    }
  }
}
