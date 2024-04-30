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
import { expressionContext } from '../../../src/index.js'

test('state.set', async () => {
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
    [1, false, false],
    [2, false, false],
    [1, true, true],
    [1, true, true],
    [3, false, false],
    ['a', false, false],
    ['b', false, false],
    ['c', false, false],
    ['b', true, true],
    ['b', true, true],
    ['e', false, false],
    [{}, false, false],
    [{}, false, false],
    ['', false, false],
    ['', true, true],
    [null, true, true],
    [null, true, true],
    [undefined, true, true],
    [undefined, true, true],
    [true, false, false],
    [false, false, false],
    [true, true, true],
    [false, true, true]
  ])
})
