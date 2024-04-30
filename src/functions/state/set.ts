const SETS_MAP = new Map<string, Set<any>>()

export function add(setName: unknown, value: unknown) {
  // TODO Нужна более общая проверка
  if (typeof setName !== 'string') {
    throw new TypeError(`Set name should to be string`)
  }

  let curSet = SETS_MAP.get(setName)

  if (curSet === undefined) {
    // TODO Добавить контроль на максимальное кол-во Set
    curSet = new Set()
    // TODO Добавить контроль на тип добавляемых данных и размер?
    SETS_MAP.set(setName, curSet)
  }

  const isValueAdded = curSet.has(value)

  if (isValueAdded === false) curSet.add(value)

  return isValueAdded
}

export function has(setName: unknown, value: unknown) {
  // TODO Нужна более общая проверка
  if (typeof setName !== 'string') {
    throw new TypeError(`Set name should to be string`)
  }

  const curSet = SETS_MAP.get(setName)

  if (curSet === undefined) return false

  return curSet.has(value)
}
