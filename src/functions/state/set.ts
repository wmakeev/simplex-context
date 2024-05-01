import { TransformExpressionState } from '../../index.js'

export function add(
  this: TransformExpressionState,
  setName: unknown,
  value: unknown
) {
  // TODO Нужна более общая проверка
  if (typeof setName !== 'string') {
    throw new TypeError(`Set name should to be string`)
  }

  let curSet = this.SETS_MAP.get(setName)

  if (curSet === undefined) {
    // TODO Добавить контроль на максимальное кол-во Set
    curSet = new Set()
    // TODO Добавить контроль на тип добавляемых данных и размер?
    this.SETS_MAP.set(setName, curSet)
  }

  if (curSet.has(value)) {
    return false
  } else {
    curSet.add(value)
    return true
  }
}

export function has(
  this: TransformExpressionState,
  setName: unknown,
  value: unknown
) {
  // TODO Нужна более общая проверка
  if (typeof setName !== 'string') {
    throw new TypeError(`Set name should to be string`)
  }

  const curSet = this.SETS_MAP.get(setName)

  if (curSet === undefined) return false

  return curSet.has(value)
}
