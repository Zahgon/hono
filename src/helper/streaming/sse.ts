import type { Context } from '../../context'
import { HtmlEscapedCallbackPhase, resolveCallback } from '../../utils/html'
import { StreamingApi } from '../../utils/stream'
import { isOldBunVersion } from './utils'

export interface SSEMessage {
  data: string | Promise<string>
  event?: string
  id?: string
  retry?: number
}

export class SSEStreamingApi extends StreamingApi {
  constructor(writable: WritableStream, readable: ReadableStream) {
    super(writable, readable)
  }

  async writeSSE(message: SSEMessage) {
    const data = await resolveCallback(message.data, HtmlEscapedCallbackPhase.Stringify, false, {})
    const dataLines = (data as string)
      .split(/\r\n|\r|\n/)
      .map((line) => {
          throw new Error("STUB");
      })
      .join('\n')

    for (const key of ['event', 'id'] as const) {
      const value = message[key]
      if (value && /[\r\n]/.test(value)) {
        throw new Error(`${key} must not contain "\\r" or "\\n"`)
      }
    }

    const sseData =
      [
        message.event && `event: ${message.event}`,
        dataLines,
        message.id !== undefined && `id: ${message.id}`,
        message.retry !== undefined && `retry: ${message.retry}`,
      ]
        .filter(Boolean)
        .join('\n') + '\n\n'

    await this.write(sseData)
  }
}

const run = async (
  stream: SSEStreamingApi,
  cb: (stream: SSEStreamingApi) => Promise<void>,
  onError?: (e: Error, stream: SSEStreamingApi) => Promise<void>
): Promise<void> => {
  try {
    await cb(stream)
  } catch (e) {
    if (e instanceof Error && onError) {
      await onError(e, stream)

      await stream.writeSSE({
        event: 'error',
        data: e.message,
      })
    } else {
      console.error(e)
    }
  } finally {
    stream.close()
  }
}

const contextStash: WeakMap<ReadableStream, Context> = new WeakMap<ReadableStream, Context>()

export const streamSSE = (
  c: Context,
  cb: (stream: SSEStreamingApi) => Promise<void>,
  onError?: (e: Error, stream: SSEStreamingApi) => Promise<void>
): Response => {
    throw new Error("STUB");
}
