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
  'TypeOf': [common.typeOf, {}],
  'NotEqual': [common.notEqual, {}],
  'Fn:Pipe': [common.pipe, {}],
  /** @deprecated use Fn:Pipe */
  'Pipe': [common.pipe, {}],
  //#endregion

  //#region Table
  'Table:VLookup': [table.vlookup, {}],
  //#endregion

  //#region Arr
  'Arr:Filter': [arr.filter, {}],
  'Arr:Map': [arr.map, {}],
  'Arr:At': [arr.at, {}],
  'Arr:Reverse': [arr.reverse, {}],
  'Arr:Join': [arr.join, {}],
  'Arr:Sort': [arr.sort, {}],
  'Arr:Uniq': [arr.uniq, {}],
  //#endregion

  //#region Str
  'Str:ReplaceAll': [str.replaceAll, {}],
  'Str:Split': [str.split, {}],
  'Str:StartsWith': [str.startsWith, {}],
  'Str:ToLowerCase': [str.toLowerCase, {}],
  'Str:Trim': [str.trim, {}],
  'Str:Template': [str.template, {}],
  'Str:Length': [str.length, {}],

  'Str:ExtractNums': [str.extractNums, {}],
  'Str:CountLeftTabs': [str.countLeftTabs, {}],
  //#endregion

  //#region Num
  'Num:ToFixed': [num.toFixed, {}],

  // TODO Нужно ли разделять на Int и Float? Всё есть Number (Float)
  'Num:ParseFloat': [num.parseFloat, {}],
  'Num:ParseInt': [num.parseInt, {}],

  'Num:TryParseFloat': [num.tryParseFloat, {}],
  'Num:TryParseInt': [num.tryParseInt, {}],

  'Num:Range': [num.range, {}],
  'Num:Round': [num.round, {}],
  //#endregion

  //#region Math
  'Math:Max': [math.max, {}],
  'Math:Min': [math.min, {}],
  //#endregion

  //#region Date
  'Date:Parse': [date.parseDate, {}],
  'Date:TryParse': [date.tryParseDate, {}],
  'Date:ToJson': [date.toJson, {}],
  //#endregion

  //#region Tools
  'Tools:RemoveExtraSpaces': [tools.removeExtraSpaces, {}],
  //#endregion

  //#region Barcode
  'Barcode:IsGTIN': [barcode.isGTIN, {}],
  //#endregion

  //#region State
  'State:Set:Add': [state.set.add, { useState: true }],
  'State:Set:Has': [state.set.has, { useState: true }],
  'State:Map:Set': [state.map.set, { useState: true }],
  'State:Map:Get': [state.map.get, { useState: true }],
  //#endregion

  //#region RegEx
  'RegExp:Match': [regex.match, {}],
  'RegExp:MatchAll': [regex.matchAll, {}],
  'RegExp:Test': [regex.test, {}]
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
