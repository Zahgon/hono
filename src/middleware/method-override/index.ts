/**
 * @module
 * Method Override Middleware for Hono.
 */

import type { Context, ExecutionContext } from '../../context'
import type { Hono } from '../../hono'
import type { MiddlewareHandler } from '../../types'
import { parseBody } from '../../utils/body'

type MethodOverrideOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app: Hono<any, any, any>
} & (
  | {
      // Default is 'form' and the value is `_method`
      form?: string
      header?: never
      query?: never
    }
  | {
      form?: never
      header: string
      query?: never
    }
  | {
      form?: never
      header?: never
      query: string
    }
)

const DEFAULT_METHOD_FORM_NAME = '_method'

/**
 * Method Override Middleware for Hono.
 *
 * @see {@link https://hono.dev/docs/middleware/builtin/method-override}
 *
 * @param {MethodOverrideOptions} options - The options for the method override middleware.
 * @param {Hono} options.app - The instance of Hono is used in your application.
 * @param {string} [options.form=_method] - Form key with a value containing the method name.
 * @param {string} [options.header] - Header name with a value containing the method name.
 * @param {string} [options.query] - Query parameter key with a value containing the method name.
 * @returns {MiddlewareHandler} The middleware handler function.
 *
 * @example
 * ```ts
 * const app = new Hono()
 *
 * // If no options are specified, the value of `_method` in the form,
 * // e.g. DELETE, is used as the method.
 * app.use('/posts', methodOverride({ app }))
 *
 * app.delete('/posts', (c) => {
 *   // ....
 * })
 * ```
 */
export const methodOverride = (options: MethodOverrideOptions): MiddlewareHandler =>
  { throw new Error("STUB"); }

const getExecutionCtx = (c: Context) => {
  let executionCtx: ExecutionContext | undefined
  try {
    executionCtx = c.executionCtx
  } catch {
    // Do nothing
  }
  return executionCtx
}
