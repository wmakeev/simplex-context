import {
  ChunkTransform,
  FlattenTransform,
  createTableTransformer,
  transforms
} from '@wmakeev/table-transform'
import { parse } from 'csv-parse'
import assert from 'node:assert/strict'
import { createReadStream } from 'node:fs'
import path from 'node:path'
import {
  Readable,
  // @ts-expect-error no typings for compose
  compose
} from 'node:stream'
import test from 'node:test'
import { createExpressionContext } from '../../src/index.js'

test('case #1', async () => {
  const expressionContext = createExpressionContext()

  const transformer = createTableTransformer({
    transforms: [
      transforms.column.rename({
        oldColumnName: 'B',
        newColumnName: 'Наименование'
      }),

      transforms.column.rename({
        oldColumnName: 'C',
        newColumnName: 'Дата'
      }),

      transforms.column.rename({
        oldColumnName: 'F',
        newColumnName: 'Штрихкод'
      }),

      transforms.column.rename({
        oldColumnName: 'G',
        newColumnName: 'Цена N'
      }),

      transforms.column.rename({
        oldColumnName: 'K',
        newColumnName: 'Цена N'
      }),

      transforms.column.add({
        columnName: 'Цена'
      }),

      transforms.column.transform(
        {
          columnName: 'Дата',
          expression: `
            (* Преобразуем формат даты *)
            value() | Str:split(_, ".") | Arr:reverse | Arr:join(_, ".")
          `
        },
        expressionContext
      ),

      transforms.column.transform(
        {
          columnName: 'Наименование',
          expression: `
            value() | Str:trim
          `
        },
        expressionContext
      ),

      transforms.column.transform(
        {
          columnName: 'Цена N',
          expression: `
            value() | Num:tryParseFloat(_, 0) | Num:round(_, 2)
          `
        },
        expressionContext
      ),

      transforms.column.transform(
        {
          columnName: 'Цена',
          expression: `
            (
              (
                values("Цена N") | Arr:uniq | Arr:filter(_, notEqual(_, 0)) | Arr:sort | Arr:at(_, 0)
              ) ?? 0
            ) | Num:toFixed(_, 2)
          `
        },
        expressionContext
      ),

      transforms.column.transform(
        {
          columnName: 'Штрихкод',
          expression: `
            (* Оставляем только корректные ШК *)
            if Barcode:isGTIN( value() ) then value()
            else ""
          `
        },
        expressionContext
      ),

      transforms.column.filter(
        {
          columnName: 'Наименование',
          expression: `
            row() > 9 and
            not empty(value()) and
            not empty('Штрихкод')
          `
        },
        expressionContext
      ),

      transforms.column.select({
        columns: ['Наименование', 'Дата', 'Штрихкод', 'Цена']
      })
    ],
    prependHeaders: 'EXCEL_STYLE'
  })

  const transformedRowsStream: Readable = compose(
    createReadStream(path.join(process.cwd(), 'test/cases/case1.csv'), {
      highWaterMark: 16 * 1024,
      encoding: 'utf8'
    }),

    parse({ bom: true }),

    new ChunkTransform({ batchSize: 100 }),

    transformer,

    new FlattenTransform()
  )

  const transformedRows = await transformedRowsStream.take(10).toArray()

  assert.deepEqual(transformedRows, [
    ['Наименование', 'Дата', 'Штрихкод', 'Цена'],
    [
      'Кофе Boggi Dolce 250гр*20шт  вак.уп. молот. (П-121,Р-)',
      '2024.09.24',
      '8003012010687',
      '289.03'
    ],
    [
      'Кофе Boggi Espresso 250гр*20шт  вак.уп.молот. (П-121,Р-)',
      '2024.10.02',
      '8003012010670',
      '222.75'
    ],
    [
      "ДАЛМАЕР 1000гр/8шт зерно Crema d'Oro (П-24,Р-8)",
      '2024.12.29',
      '4008167152729',
      '1515.92'
    ],
    [
      "ДАЛМАЕР 1000гр/8шт зерно Crema d'Oro Selektion (П-24,Р-8)",
      '2025.04.26',
      '4008167035503',
      '1425.00'
    ],
    [
      'ДАЛМАЕР 1000гр/8шт зерно Crema Prodomo (П-24,Р-8)',
      '2024.11.29',
      '4008167055105',
      '1425.00'
    ],
    [
      "ДАЛМАЕР 1000гр/8шт зерно Espresso d'Oro (П-24,Р-8)",
      '2024.11.29',
      '4008167154679',
      '1425.00'
    ],
    [
      'ДАЛМАЕР 500гр/12шт зерно Prodomo (П-49,Р-7)',
      '2024.11.29',
      '4008167103219',
      '715.00'
    ],
    [
      'ДАЛМАЕР 500гр/12шт молотый Prodomo (П-60,Р-12)',
      '2025.12.11',
      '4008167103714',
      '715.00'
    ],
    [
      'ИЛЛИ ARABICA SELECTION BRAZIL 250гр/6шт зерно (П-156, Р-12)',
      '2025.08.21',
      '8003753970042',
      '740.00'
    ]
  ])
})
