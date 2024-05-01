export interface TransformExpressionContext {
  symbols:
    | {
        [T: string]: any
      }
    | undefined
}

export interface TransformExpressionState {
  SETS_MAP: Map<string, Set<any>>
}
