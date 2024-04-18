export interface TransformExpressionContext {
  functions?:
    | {
        [k: string]: (...args: any[]) => any
      }
    | undefined

  constants?:
    | {
        [T: string]: any
      }
    | undefined
}
