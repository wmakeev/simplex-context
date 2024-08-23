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

test('state.map', async () => {
  const expressionContext = createExpressionContext()

  /* prettier-ignore */
  const srcData = [
    ['key' , 'val'],
    ['01'  , 1    ],
    ['02'  , 2    ],
    ['03'  , 1    ],
    ['01'  , 1    ],
    ['05'  , 3    ],
    ['06'  , 'a'  ],
    ['07'  , 'b'  ],
    ['08'  , 'c'  ],
    ['09'  , 'b'  ],
    ['09'  , 'b'  ],
    ['01'  , 'e'  ],
    [ 1    , 11   ],
    [ true , 'ok' ],
    ['12'  , {}   ],
    ['12'  , {}   ],
    ['12'  , {}   ],
    ['14'  , ''   ],
    ['15'  , ''   ],
    ['16'  , null ],
    ['16'  , null ],
    ['18'  , undefined],
    ['18'  , undefined],
    ['20'  , true ],
    ['21'  , false],
    ['20'  , true ],
    ['21'  , false],
    [ 1    , 12   ],
  ]

  const csvTransformer = createTableTransformer({
    transforms: [
      transforms.column.add({
        columnName: 'set1'
      }),

      transforms.column.transform(
        {
          columnName: 'set1',
          expression: `
            State:Map:set("test1", 'key', 'val')
          `
        },
        expressionContext
      ),

      transforms.column.add({
        columnName: 'get1'
      }),

      transforms.column.transform(
        {
          columnName: 'get1',
          expression: `
            State:Map:get("test1", 'key')
          `
        },
        expressionContext
      )
    ]
  })

  const transformedRowsStream: Readable = compose(
    srcData.values(),
    new ChunkTransform({ batchSize: 10 }),
    csvTransformer,
    new FlattenTransform()
  )

  const transformedRows = await transformedRowsStream.toArray()

  assert.deepEqual(transformedRows, [
    ['key', 'val', 'set1', 'get1'],
    ['01', 1, true, 1],
    ['02', 2, true, 2],
    ['03', 1, true, 1],
    ['01', 1, false, 1],
    ['05', 3, true, 3],
    ['06', 'a', true, 'a'],
    ['07', 'b', true, 'b'],
    ['08', 'c', true, 'c'],
    ['09', 'b', true, 'b'],
    ['09', 'b', false, 'b'],
    ['01', 'e', true, 'e'],
    [1, 11, true, 11],
    [true, 'ok', true, 'ok'],
    ['12', {}, true, {}],
    ['12', {}, true, {}],
    ['12', {}, true, {}],
    ['14', '', true, ''],
    ['15', '', true, ''],
    ['16', null, true, ''],
    ['16', null, false, ''],
    ['18', undefined, true, ''],
    ['18', undefined, false, ''],
    ['20', true, true, true],
    ['21', false, true, false],
    ['20', true, false, true],
    ['21', false, false, false],
    [1, 12, true, 12]
  ])
})
