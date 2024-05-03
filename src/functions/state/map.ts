import { cast } from '@wmakeev/filtrex'
import { TransformExpressionState } from '../../index.js'

export function set(
  this: TransformExpressionState,
  mapName: unknown,
  key: unknown,
  value: unknown
) {
  const _mapName = cast.asString(mapName)
  const _key = cast.asSimple(key)

  let curMap = this.MAPS_MAP.get(_mapName)

  if (curMap === undefined) {
    // TODO Добавить контроль на максимальное кол-во Set
    curMap = new Map()
    // TODO Добавить контроль на тип добавляемых данных и размер?
    this.MAPS_MAP.set(_mapName, curMap)
  }

  const storedValue = curMap.get(_key)

  if (storedValue === value) return false

  curMap.set(_key, value)

  return true
}

export function get(
  this: TransformExpressionState,
  mapName: unknown,
  key: unknown
) {
  const _mapName = cast.asString(mapName)
  const _key = cast.asSimple(key)

  const curMap = this.MAPS_MAP.get(_mapName)

  if (curMap === undefined) return undefined

  return curMap.get(_key)
}
