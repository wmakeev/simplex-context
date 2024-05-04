import {
  ChunkTransform,
  FlattenTransform,
  TableTransfromConfig,
  createTableTransformer
} from '@wmakeev/table-transform'
import {
  Readable,
  // @ts-expect-error no typings for compose
  compose
} from 'node:stream'

export async function transformArray(
  transformConfig: TableTransfromConfig,
  srcArray: Array<any>,
  batchSize = 10
) {
  const csvTransformer = createTableTransformer(transformConfig)

  const transformedRowsStream: Readable = compose(
    srcArray.values(),
    new ChunkTransform({ batchSize }),
    csvTransformer,
    new FlattenTransform()
  )

  const transformedRows = await transformedRowsStream.toArray()

  return transformedRows
}
