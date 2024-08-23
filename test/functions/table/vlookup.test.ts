import {
  ChunkTransform,
  FlattenTransform,
  createTableTransformer,
  transforms
} from '@wmakeev/table-transform'
import assert from 'node:assert/strict'
import {
  Readable,
  // @ts-expect-error no typings for compose
  compose
} from 'node:stream'
import test from 'node:test'
import { createExpressionContext } from '../../../src/index.js'

test('table.vlookup', async () => {
  const expressionContext = createExpressionContext()

  /* prettier-ignore */
  expressionContext.symbols!['LOOKUP_TABLE'] = [
    ['col1', 'col2', 'col3', 'col4'],
    ['1'   , 'a'   , '12'  , '!'   ],
    ['2'   , 'b'   , '13'  , '@'   ],
    ['3'   , 'c'   , '14'  , '$'   ],
    ['4'   , 'd'   , '15'  , '%'   ],
    ['5'   , 'e'   , '16'  , '^'   ],
    ['6'   , 'f'   , '17'  , '&'   ],
    ['7'   , 'g'   , '18'  , '*'   ],
    ['8'   , 'h'   , '19'  , '('   ],
  ]

  /* prettier-ignore */
  const srcData = [
    ['num'],
    ['2'],
    ['4'],
    ['7'],
    ['1'],
    ['3'],
    ['6'],
    ['8'],
    ['5'],
  ]

  const csvTransformer = createTableTransformer({
    transforms: [
      transforms.column.add({
        columnName: 'result1'
      }),

      transforms.column.transform(
        {
          columnName: 'result1',
          expression: `
            Table:vLookup('num', LOOKUP_TABLE, 1)
          `
        },
        expressionContext
      ),

      transforms.column.add({
        columnName: 'result2'
      }),

      transforms.column.transform(
        {
          columnName: 'result2',
          expression: `
            Table:vLookup('num', LOOKUP_TABLE, 3)
          `
        },
        expressionContext
      ),

      transforms.column.add({
        columnName: 'result3'
      }),

      transforms.column.transform(
        {
          columnName: 'result3',
          expression: `
            Table:vLookup('num', LOOKUP_TABLE, "col2")
          `
        },
        expressionContext
      ),

      transforms.column.add({
        columnName: 'result4'
      }),

      transforms.column.transform(
        {
          columnName: 'result4',
          expression: `
            Table:vLookup('num', LOOKUP_TABLE, 1)
          `
        },
        expressionContext
      )
    ]
  })

  const transformedRowsStream: Readable = compose(
    srcData.values(),
    // batchSize=1 to call add after has
    new ChunkTransform({ batchSize: 5 }),
    csvTransformer,
    new FlattenTransform()
  )

  const transformedRows = await transformedRowsStream.toArray()

  assert.deepEqual(transformedRows, [
    ['num', 'result1', 'result2', 'result3', 'result4'],
    ['2', '2', '13', 'b', '2'],
    ['4', '4', '15', 'd', '4'],
    ['7', '7', '18', 'g', '7'],
    ['1', '1', '12', 'a', '1'],
    ['3', '3', '14', 'c', '3'],
    ['6', '6', '17', 'f', '6'],
    ['8', '8', '19', 'h', '8'],
    ['5', '5', '16', 'e', '5']
  ])
})
