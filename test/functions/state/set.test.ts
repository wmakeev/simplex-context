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

test('state.set', async () => {
  const expressionContext = createExpressionContext()

  /* prettier-ignore */
  const srcData = [
    ['col1'],
    [1],
    [2],
    [1],
    [1],
    [3],
    ['a'],
    ['b'],
    ['c'],
    ['b'],
    ['b'],
    ['e'],
    [{}],
    [{}],
    [''],
    [''],
    [null],
    [null],
    [undefined],
    [undefined],
    [true],
    [false],
    [true],
    [false]
  ]

  const csvTransformer = createTableTransformer({
    transforms: [
      transforms.column.add({
        columnName: 'has'
      }),

      transforms.column.transform(
        {
          columnName: 'has',
          expression: `
            State:Set:Has("test", 'col1')
          `
        },
        expressionContext
      ),

      transforms.column.add({
        columnName: 'add'
      }),

      transforms.column.transform(
        {
          columnName: 'add',
          expression: `
            State:Set:Add("test", 'col1')
          `
        },
        expressionContext
      )
    ]
  })

  const transformedRowsStream: Readable = compose(
    srcData.values(),
    // batchSize=1 to call add after has
    new ChunkTransform({ batchSize: 1 }),
    csvTransformer,
    new FlattenTransform()
  )

  const transformedRows = await transformedRowsStream.toArray()

  assert.deepEqual(transformedRows, [
    ['col1', 'has', 'add'],
    [1, false, true],
    [2, false, true],
    [1, true, false],
    [1, true, false],
    [3, false, true],
    ['a', false, true],
    ['b', false, true],
    ['c', false, true],
    ['b', true, false],
    ['b', true, false],
    ['e', false, true],
    [{}, false, true],
    [{}, false, true],
    ['', false, true],
    ['', true, false],
    [null, true, false],
    [null, true, false],
    [undefined, true, false],
    [undefined, true, false],
    [true, false, true],
    [false, false, true],
    [true, true, false],
    [false, true, false]
  ])
})

test('state.set (deduplication)', async () => {
  const expressionContext = createExpressionContext()

  /* prettier-ignore */
  const srcData = [
    ['col1'],
    [1],
    [2],
    [1],
    [1],
    [3],
    ['a'],
    ['b'],
    ['c'],
    ['b'],
    ['b'],
    ['e'],
    ['a'],
    [{}],
    [{}],
    [''],
    [''],
    [null],
    [null],
    [undefined],
    [undefined],
    [true],
    [false],
    [true],
    [false]
  ]

  const csvTransformer = createTableTransformer({
    transforms: [
      transforms.column.add({
        columnName: 'add'
      }),

      transforms.column.transform(
        {
          columnName: 'add',
          expression: `
            State:Set:Add("test", 'col1')
          `
        },
        expressionContext
      ),

      transforms.column.filter(
        {
          columnName: 'add',
          expression: `
            value() == TRUE
          `
        },
        expressionContext
      ),

      transforms.column.select({
        columns: ['col1']
      })
    ]
  })

  const transformedRowsStream: Readable = compose(
    srcData.values(),
    // batchSize=1 to call add after has
    new ChunkTransform({ batchSize: 10 }),
    csvTransformer,
    new FlattenTransform()
  )

  const transformedRows = await transformedRowsStream.toArray()

  assert.deepEqual(transformedRows, [
    ['col1'],
    [1, true],
    [2, true],
    [3, true],
    ['a', true],
    ['b', true],
    ['c', true],
    ['e', true],
    [{}, true],
    [{}, true],
    ['', true],
    [true, true],
    [false, true]
  ])
})
