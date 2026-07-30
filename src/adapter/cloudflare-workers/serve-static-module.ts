// For ES module mode
import type { Env, MiddlewareHandler } from '../../types'
import type { ServeStaticOptions } from './serve-static'
import { serveStatic } from './serve-static'

const module = <E extends Env = Env>(
  options: Omit<ServeStaticOptions<E>, 'namespace'>
): MiddlewareHandler => {
    throw new Error("STUB");
}

export { module as serveStatic }
