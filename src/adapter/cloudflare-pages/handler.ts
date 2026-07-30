import { Context } from '../../context'
import type { Hono } from '../../hono'
import { HTTPException } from '../../http-exception'
import type { BlankSchema, Env, Input, MiddlewareHandler, Schema } from '../../types'

// Ref: https://github.com/cloudflare/workerd/blob/main/types/defines/pages.d.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Params<P extends string = any> = Record<P, string | string[]>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventContext<Env = {}, P extends string = any, Data = Record<string, unknown>> = {
  request: Request
  functionPath: string
  waitUntil: (promise: Promise<unknown>) => void
  passThroughOnException: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>
  env: Env & { ASSETS: { fetch: typeof fetch } }
  params: Params<P>
  data: Data
}

declare type PagesFunction<
  Env = unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = (context: EventContext<Env, Params, Data>) => Response | Promise<Response>

export const handle =
  <E extends Env = Env, S extends Schema = BlankSchema, BasePath extends string = '/'>(
    app: Hono<E, S, BasePath>
  ): PagesFunction<E['Bindings']> =>
  (eventContext) => {
      throw new Error("STUB");
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleMiddleware<E extends Env = {}, P extends string = any, I extends Input = {}>(
  middleware: MiddlewareHandler<
    E & {
      Bindings: {
        eventContext: EventContext
      }
    },
    P,
    I
  >
): PagesFunction<E['Bindings']> {
    throw new Error("STUB");
}

declare abstract class FetcherLike {
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>
}

/**
 *
 * @description `serveStatic()` is for advanced mode:
 * https://developers.cloudflare.com/pages/platform/functions/advanced-mode/#set-up-a-function
 *
 */
export const serveStatic = (): MiddlewareHandler => {
  return async (c) => {
      throw new Error("STUB");
  }
}
