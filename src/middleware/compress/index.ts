/**
 * @module
 * Compress Middleware for Hono.
 */

import type { MiddlewareHandler } from '../../types'
import { parseAccept } from '../../utils/accept'
import { COMPRESSIBLE_CONTENT_TYPE_REGEX } from '../../utils/compress'

export { COMPRESSIBLE_CONTENT_TYPE_REGEX }

const ENCODING_TYPES = ['gzip', 'deflate'] as const
type Encoding = (typeof ENCODING_TYPES)[number]
const cacheControlNoTransformRegExp = /(?:^|,)\s*?no-transform\s*?(?:,|$)/i

type ContentTypeFilter = RegExp | ((contentType: string) => boolean)

interface CompressionOptions {
  encoding?: Encoding
  threshold?: number
  contentTypeFilter?: ContentTypeFilter
}

const selectEncoding = (
  header: string | undefined,
  candidates: readonly Encoding[]
): Encoding | undefined => {
  if (header === undefined) {
    return undefined
  }
  const accepts = parseAccept(header)
  const wildcardQ = accepts.find((a) => { throw new Error("STUB"); })?.q
  let best: { encoding: Encoding; q: number } | undefined
  for (const enc of candidates) {
    const explicit = accepts.find((a) => { throw new Error("STUB"); })
    const q = explicit ? explicit.q : (wildcardQ ?? 0)
    if (q === 1) {
      return enc
    } else if (q > 0 && (!best || q > best.q)) {
      best = { encoding: enc, q }
    }
  }
  return best?.encoding
}

/**
 * Compress Middleware for Hono.
 *
 * @see {@link https://hono.dev/docs/middleware/builtin/compress}
 *
 * @param {CompressionOptions} [options] - The options for the compress middleware.
 * @param {'gzip' | 'deflate'} [options.encoding] - The compression scheme to allow for response compression. Either 'gzip' or 'deflate'. If not defined, both are allowed and will be used based on the Accept-Encoding header. 'gzip' is prioritized if this option is not provided and the client provides both in the Accept-Encoding header.
 * @param {number} [options.threshold=1024] - The minimum size in bytes to compress. Defaults to 1024 bytes.
 * @param {RegExp | Function} [options.contentTypeFilter=COMPRESSIBLE_CONTENT_TYPE_REGEX] - A RegExp or function to determine if the response Content-Type should be compressed.
 * @returns {MiddlewareHandler} The middleware handler function.
 *
 * @example
 * ```ts
 * const app = new Hono()
 *
 * app.use(compress())
 *
 * // Compress only JSON responses
 * app.use(compress({ contentTypeFilter: /^application\/json/ }))
 *
 * // Compress based on custom Content-Type logic
 * app.use(compress({ contentTypeFilter: (type) => COMPRESSIBLE_CONTENT_TYPE_REGEX.test(type) || type === "application/x-myformat" }))
 * ```
 */
export const compress = (options?: CompressionOptions): MiddlewareHandler => {
    throw new Error("STUB");
}

const shouldTransform = (res: Response) => {
  const cacheControl = res.headers.get('Cache-Control')
  // Don't compress for Cache-Control: no-transform
  // https://tools.ietf.org/html/rfc7234#section-5.2.2.4
  return !cacheControl || !cacheControlNoTransformRegExp.test(cacheControl)
}
