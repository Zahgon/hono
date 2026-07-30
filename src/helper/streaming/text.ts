import type { Context } from '../../context'
import { TEXT_PLAIN } from '../../context'
import type { StreamingApi } from '../../utils/stream'
import { stream } from './'

export const streamText = (
  c: Context,
  cb: (stream: StreamingApi) => Promise<void>,
  onError?: (e: Error, stream: StreamingApi) => Promise<void>
): Response => {
    throw new Error("STUB");
}
