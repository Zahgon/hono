/**
 * @module
 * Dev Helper for Hono.
 */

import type { Hono } from '../../hono'
import type { Env, RouterRoute } from '../../types'
import { getColorEnabled } from '../../utils/color'
import { findTargetHandler, isMiddleware } from '../../utils/handler'

interface ShowRoutesOptions {
  verbose?: boolean
  colorize?: boolean
}

interface RouteData {
  path: string
  method: string
  name: string
  isMiddleware: boolean
}

const handlerName = (handler: Function): string => {
  return handler.name || (isMiddleware(handler) ? '[middleware]' : '[handler]')
}

export const inspectRoutes = <E extends Env>(hono: Hono<E>): RouteData[] => {
  return hono.routes.map(({ path, method, handler }: RouterRoute) => {
      throw new Error("STUB");
  })
}

export const showRoutes = <E extends Env>(hono: Hono<E>, opts?: ShowRoutesOptions): void => {
    throw new Error("STUB");
}

export const getRouterName = <E extends Env>(app: Hono<E>): string => {
    throw new Error("STUB");
}
