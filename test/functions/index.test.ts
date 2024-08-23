import {
  ChunkTransform,
  FlattenTransform,
  createTableTransformer,
  transforms
} from '@wmakeev/table-transform'
import assert from 'node:assert'
import {
  Readable,
  // @ts-expect-error no typings for compose
  compose
} from 'node:stream'
import test from 'node:test'
import { createExpressionContext } from '../../src/index.js'

test('num', async () => {
  const expressionContext = createExpressionContext()

  const srcData = [
    ['value', 'result'],
    ['1', ''],
    ['12.52', ''],
    ['1 393,26 '],
    ['12 000,78', ''],
    ['13 000. 50', ''],
    ['13,000,000. 50', '']
  ]

  const csvTransformer = createTableTransformer({
    transforms: [
      transforms.column.transform(
        {
          columnName: 'result',
          expression: `
            Num:tryParseFloat('value')
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
    ['value', 'result'],
    ['1', 1],
    ['12.52', 12.52],
    ['1 393,26 ', 1393.26],
    ['12 000,78', 12000.78],
    ['13 000. 50', 13000.5],
    ['13,000,000. 50', 13000000.5]
  ])
})

test('curried functions', async () => {
  const expressionContext = createExpressionContext()

  const srcData = [
    ['case', 'val'],
    ['1', '']
  ]

  const csvTransformer = createTableTransformer({
    transforms: [
      transforms.column.transform(
        {
          columnName: 'val',
          expression: `
            if 'case' == "1" then
              (3, 0, "1", 6, 0, "foo", 8, 2)
                | Arr:filter(_, notEqual(_, 0))
                | Arr:filter(_, pipe(typeOf(_), notEqual(_, "string")))
                | Math:min
            else
              value()
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
    ['case', 'val'],
    ['1', 2]
  ])
})

test('barcode', async () => {
  const expressionContext = createExpressionContext()

  const srcData = [
    ['value', 'result'],
    ['4850001392774', ''],
    [4850001392774, ''],
    ['4850001392773', ''],
    ['20000059', ''],
    ['40099644', ''],
    ['57027906'],
    ['57027905'],
    ['4603224167731.', ''],
    ['46 032241 67731', ''],
    ['', '']
  ]

  const csvTransformer = createTableTransformer({
    transforms: [
      transforms.column.transform(
        {
          columnName: 'result',
          expression: `
            Barcode:isGTIN('value')
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
    ['value', 'result'],
    ['4850001392774', true],
    [4850001392774, true],
    ['4850001392773', false],
    ['20000059', true],
    ['40099644', true],
    ['57027906', true],
    ['57027905', false],
    ['4603224167731.', false],
    ['46 032241 67731', false],
    ['', false]
  ])
})

test('tools', async () => {
  const expressionContext = createExpressionContext()

  const srcData = [
    ['value', 'result'],
    ['48 5 00013 92774', ''],
    ['sj1kjsd2kd 3d+-456 jasd7', ''],
    ['sdf 12 d\ndd3  433\n', ''],
    [123, ''],
    [true, ''],
    ['', '']
  ]

  const csvTransformer = createTableTransformer({
    transforms: [
      transforms.column.transform(
        {
          columnName: 'result',
          expression: `
            Str:extractNums('value')
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
    ['value', 'result'],
    ['48 5 00013 92774', '4850001392774'],
    ['sj1kjsd2kd 3d+-456 jasd7', '1234567'],
    ['sdf 12 d\ndd3  433\n', '123433'],
    [123, 123],
    [true, true],
    ['', '']
  ])
})
