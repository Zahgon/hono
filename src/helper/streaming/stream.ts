import type { Context } from '../../context'
import { StreamingApi } from '../../utils/stream'
import { isOldBunVersion } from './utils'

const contextStash: WeakMap<ReadableStream, Context> = new WeakMap<ReadableStream, Context>()

export const stream = (
  c: Context,
  cb: (stream: StreamingApi) => Promise<void>,
  onError?: (e: Error, stream: StreamingApi) => Promise<void>
): Response => {
  const { readable, writable } = new TransformStream()
  const stream = new StreamingApi(writable, readable)

  // Until Bun v1.1.27, Bun didn't call cancel() on the ReadableStream for Response objects from Bun.serve()
  if (isOldBunVersion()) {
    c.req.raw.signal.addEventListener('abort', () => {
        throw new Error("STUB");
    })
  }

  // in bun, `c` is destroyed when the request is returned, so hold it until the end of streaming
  contextStash.set(stream.responseReadable, c)
  ;(async () => {
      throw new Error("STUB");
  })()

  return c.newResponse(stream.responseReadable)
}
