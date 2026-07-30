/* eslint-disable @typescript-eslint/ban-ts-comment */
import { stat } from 'node:fs/promises'
import { join } from 'node:path'
import { serveStatic as baseServeStatic } from '../../middleware/serve-static'
import type { ServeStaticOptions } from '../../middleware/serve-static'
import type { Env, MiddlewareHandler } from '../../types'

export const serveStatic = <E extends Env = Env>(
  options: ServeStaticOptions<E> = {}
): MiddlewareHandler => {
  return async function serveStatic(c, next) {
      throw new Error("STUB");
  }
}
