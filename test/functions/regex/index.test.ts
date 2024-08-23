import { TableTransfromConfig, transforms } from '@wmakeev/table-transform'
import assert from 'node:assert/strict'
import test from 'node:test'
import * as regex from '../../../src/functions/regex/index.js'
import { createExpressionContext } from '../../../src/index.js'
import { transformArray } from '../_helpers/index.js'

test('regex #1', async () => {
  const expressionContext = createExpressionContext()

  /* prettier-ignore */
  const srcRows = [
    [ 'val'             , 'pattern', ],
    [ 'fee fi fo fum'   , '\\w+\\s', ],
    [ 'fee fi fo fum'   , '(\\w+)\\s', ],
  ]

  const transformConfig: TableTransfromConfig = {
    transforms: [
      transforms.column.add({
        columnName: 'match'
      }),

      transforms.column.transform(
        {
          columnName: 'match',
          expression: `
            RegExp:match('pattern', 'val') | Arr:join
          `
        },
        expressionContext
      ),

      transforms.column.add({
        columnName: 'matchAll'
      }),

      transforms.column.transform(
        {
          columnName: 'matchAll',
          expression: `
            RegExp:matchAll('pattern', 'val') | Arr:map(_, Arr:at(_, -1)) | Arr:join
          `
        },
        expressionContext
      ),

      transforms.column.add({
        columnName: 'test'
      }),

      transforms.column.transform(
        {
          columnName: 'test',
          expression: `
            RegExp:test('pattern', 'val')
          `
        },
        expressionContext
      )
    ]
  }

  const transformedRows = await transformArray(transformConfig, srcRows)

  assert.deepEqual(
    transformedRows,
    /* prettier-ignore */
    [
      ['val'          , 'pattern'  , 'match'    , 'matchAll'    , 'test'],
      ['fee fi fo fum', '\\w+\\s'  , 'fee '     , 'fee ,fi ,fo ', true  ],
      ['fee fi fo fum', '(\\w+)\\s', 'fee ,fee' , 'fee,fi,fo'   , true  ]
    ]
  )
})

test('regex #2', async () => {
  const expressionContext = createExpressionContext()

  /* prettier-ignore */
  const srcRows = [
    [ 'text' ],
    [ 'Оплата по счету 39496 от 13.06.2024. Сумма: 2 062,90. Без НДС' ],
    [ 'Оплата по счету №39488 от 13.06.2024г.   НДС не облагается' ],
    [ 'Оплата по счету № 39486 от 13.06.2024 НДС не облагается.' ],
    [ 'СЧЕТ  39536 от 17.06.2024. НДС не облагается' ],
    [ '(244,л/с 20726Ц41000) Оплата за приобретение товаров (мягкий инвентарь для Гостиницы ) , Счет № 190810 от 04.06.2024г. НДС не облагается.' ],
    [ 'Оплата за тов. по дог. ИР-4715/21 от 23.01.2021 согл.накл.№№:7087306 от 31.05.24. НДС не обл.' ],
  ]

  const transformConfig: TableTransfromConfig = {
    transforms: [
      transforms.column.add({
        columnName: 'pattern',
        defaultValue: 'счет\\D+(\\d+)\\s+от\\s+(\\d{2})\\.(\\d{2}).(\\d{4})'
      }),

      transforms.column.add({
        columnName: 'match'
      }),

      transforms.column.transform(
        {
          columnName: 'text',
          expression: `
            Str:toLowerCase(value())
          `
        },
        expressionContext
      ),

      transforms.column.transform(
        {
          columnName: 'match',
          expression: `
            RegExp:match('pattern', 'text')
          `
        },
        expressionContext
      ),

      transforms.column.add({
        columnName: 'document'
      }),

      transforms.column.transform(
        {
          columnName: 'document',
          expression: `
            Arr:at('match', 1) ?? ""
          `
        },
        expressionContext
      ),

      transforms.column.add({
        columnName: 'date'
      }),

      transforms.column.transform(
        {
          columnName: 'date',
          expression: `
            if not empty('match') and not empty(Arr:at('match', 4)) then
              Arr:at('match', 4) & "-" & Arr:at('match', 3) & "-" & Arr:at('match', 2)
            else ""
          `
        },
        expressionContext
      ),

      transforms.column.select({
        columns: ['document', 'date']
      })
    ]
  }

  const transformedRows = await transformArray(transformConfig, srcRows)

  assert.deepEqual(transformedRows, [
    ['document', 'date'],
    ['39496', '2024-06-13'],
    ['39488', '2024-06-13'],
    ['39486', '2024-06-13'],
    ['39536', '2024-06-17'],
    ['190810', '2024-06-04'],
    ['', '']
  ])
})

test('regex (ReDoS)', async () => {
  assert.throws(() => regex.test('(a+)+', 'aaaaX'))
  assert.throws(() => regex.match('([a-zA-Z]+)*', 'aaaaaaaaaaaaaaaaa!'))
  assert.throws(() =>
    regex.test(
      '([a-zA-Z0-9])(([-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))',
      'aaaaaaaaaaaaaaaaaaaaaaaa!'
    )
  )
  assert.throws(() =>
    regex.test('(([a-z])+.)+[A-Z]([a-z])+', 'aaaaaaaaaaaaaaaaaaaaaaaa!')
  )
})
