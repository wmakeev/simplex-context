export const CURRY_PLACEHOLDER = Symbol('CURRY_PLACEHOLDER')

export const curryWrapper = (fn: Function, fnName: string) => {
  const wrappedFn = (...args: any[]) => {
    try {
      return fn(...args)
    } catch (err: any) {
      throw new Error(`Error in function ${fnName} - ${err?.message}`, {
        cause: err
      })
    }
  }

  return (...args: any[]) => {
    const phIndex = args.indexOf(CURRY_PLACEHOLDER)

    if (phIndex === -1) return wrappedFn(...args)

    return (phArg: any) => {
      args[phIndex] = phArg
      return wrappedFn(...args)
    }
  }
}
