import { TransformExpressionState } from '../types.js'
import * as arr from './arr/index.js'
import * as barcode from './barcode/index.js'
import * as common from './common/index.js'
import { curryWrapper } from './curryWrapper.js'
import * as date from './date/index.js'
import * as math from './math/index.js'
import * as num from './num/index.js'
import * as state from './state/index.js'
import * as str from './str/index.js'
import * as table from './table/index.js'
import * as tools from './tools/index.js'
import * as regex from './regex/index.js'

interface FunctionConfig {
  useState?: boolean
}

const functionsByName: Record<
  string,
  [(...args: any[]) => any, FunctionConfig]
> = {
  //#region Common
  'typeOf': [common.typeOf, {}],
  'notEqual': [common.notEqual, {}],
  'Fn:pipe': [common.pipe, {}],
  /** @deprecated use Fn:pipe */
  'pipe': [common.pipe, {}],
  //#endregion

  //#region Table
  'Table:vLookup': [table.vlookup, {}],
  //#endregion

  //#region Arr
  'Arr:at': [arr.at, {}],
  'Arr:coalesce': [arr.coalesce, {}],
  'Arr:filter': [arr.filter, {}],
  'Arr:join': [arr.join, {}],
  'Arr:map': [arr.map, {}],
  'Arr:reverse': [arr.reverse, {}],
  'Arr:sort': [arr.sort, {}],
  'Arr:uniq': [arr.uniq, {}],
  //#endregion

  //#region Str
  'Str:replaceAll': [str.replaceAll, {}],
  'Str:split': [str.split, {}],
  'Str:startsWith': [str.startsWith, {}],
  'Str:toLowerCase': [str.toLowerCase, {}],
  'Str:trim': [str.trim, {}],
  'Str:template': [str.template, {}],
  'Str:length': [str.length, {}],

  'Str:extractNums': [str.extractNums, {}],
  'Str:countLeftTabs': [str.countLeftTabs, {}],
  //#endregion

  //#region Num
  'Num:toFixed': [num.toFixed, {}],

  // TODO Нужно ли разделять на Int и Float? Всё есть Number (Float)
  'Num:parseFloat': [num.parseFloat, {}],
  'Num:parseInt': [num.parseInt, {}],

  'Num:tryParseFloat': [num.tryParseFloat, {}],
  'Num:tryParseInt': [num.tryParseInt, {}],

  'Num:range': [num.range, {}],
  'Num:round': [num.round, {}],
  //#endregion

  //#region Math
  'Math:max': [math.max, {}],
  'Math:min': [math.min, {}],
  //#endregion

  //#region Date
  'Date:parse': [date.parseDate, {}],
  'Date:tryParse': [date.tryParseDate, {}],
  'Date:toJson': [date.toJson, {}],
  //#endregion

  //#region Tools
  'Tools:removeExtraSpaces': [tools.removeExtraSpaces, {}],
  //#endregion

  //#region Barcode
  'Barcode:isGTIN': [barcode.isGTIN, {}],
  //#endregion

  //#region State
  'State:Set:add': [state.set.add, { useState: true }],
  'State:Set:has': [state.set.has, { useState: true }],
  'State:Map:set': [state.map.set, { useState: true }],
  'State:Map:get': [state.map.get, { useState: true }],
  //#endregion

  //#region RegEx
  'RegExp:match': [regex.match, {}],
  'RegExp:matchAll': [regex.matchAll, {}],
  'RegExp:test': [regex.test, {}]
  //#endregion
}

export function getFunctions(state: TransformExpressionState) {
  const functions = Object.fromEntries(
    [...Object.entries(functionsByName)].map(([name, fnInfo]) => {
      return [
        name,
        curryWrapper(
          fnInfo[1].useState !== true ? fnInfo[0] : fnInfo[0].bind(state),
          name
        )
      ]
    })
  )

  return functions
}
