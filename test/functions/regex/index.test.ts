import { TableTransfromConfig, transforms } from '@wmakeev/table-transform'
import assert from 'node:assert/strict'
import test from 'node:test'
import * as regex from '../../../src/functions/regex/index.js'
import { createExpressionContext } from '../../../src/index.js'
import { transformArray } from '../_helpers/index.js'

test('regex', async () => {
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
            RegExp:Match('pattern', 'val') | Arr:Join
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
            RegExp:MatchAll('pattern', 'val') | Arr:Map(_, Arr:At(_, -1)) | Arr:Join
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
            RegExp:Test('pattern', 'val')
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
