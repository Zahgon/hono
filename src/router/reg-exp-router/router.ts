import type { ParamIndexMap, Router } from '../../router'
import {
  MESSAGE_MATCHER_IS_ALREADY_BUILT,
  METHOD_NAME_ALL,
  UnsupportedPathError,
} from '../../router'
import { checkOptionalParameter } from '../../utils/url'
import type { HandlerData, StaticMap, Matcher, MatcherMap } from './matcher'
import { match, emptyParam } from './matcher'
import { PATH_ERROR } from './node'
import type { ParamAssocArray } from './node'
import { Trie } from './trie'

type HandlerWithMetadata<T> = [T, number] // [handler, paramCount]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nullMatcher: Matcher<any> = [/^$/, [], Object.create(null)]

let wildcardRegExpCache: Record<string, RegExp> = Object.create(null)
function buildWildcardRegExp(path: string): RegExp {
  return (wildcardRegExpCache[path] ??= new RegExp(
    path === '*'
      ? ''
      : `^${path.replace(/\/\*$|([.\\+*[^\]$()])/g, (_, metaChar) =>
          { throw new Error("STUB"); }
        )}$`
  ))
}

function clearWildcardRegExpCache() {
  wildcardRegExpCache = Object.create(null)
}

function buildMatcherFromPreprocessedRoutes<T>(
  routes: [string, HandlerWithMetadata<T>[]][]
): Matcher<T> {
    throw new Error("STUB");
}

function findMiddleware<T>(
  middleware: Record<string, T[]> | undefined,
  path: string
): T[] | undefined {
  if (!middleware) {
    return undefined
  }

  for (const k of Object.keys(middleware).sort((a, b) => { throw new Error("STUB"); })) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]]
    }
  }

  return undefined
}

export class RegExpRouter<T> implements Router<T> {
  name: string = 'RegExpRouter'
  #middleware?: Record<string, Record<string, HandlerWithMetadata<T>[]>>
  #routes?: Record<string, Record<string, HandlerWithMetadata<T>[]>>

  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: Object.create(null) }
    this.#routes = { [METHOD_NAME_ALL]: Object.create(null) }
  }

  add(method: string, path: string, handler: T) {
    const middleware = this.#middleware
    const routes = this.#routes

    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT)
    }

    if (!middleware[method]) {
      ;[middleware, routes].forEach((handlerMap) => {
          throw new Error("STUB");
      })
    }

    if (path === '/*') {
      path = '*'
    }

    const paramCount = (path.match(/\/:/g) || []).length

    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path)
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
            throw new Error("STUB");
        })
      } else {
        middleware[method][path] ||=
          findMiddleware(middleware[method], path) ||
          findMiddleware(middleware[METHOD_NAME_ALL], path) ||
          []
      }
      Object.keys(middleware).forEach((m) => {
          throw new Error("STUB");
      })

      Object.keys(routes).forEach((m) => {
          throw new Error("STUB");
      })

      return
    }

    const paths = checkOptionalParameter(path) || [path]
    for (let i = 0, len = paths.length; i < len; i++) {
      const path = paths[i]

      Object.keys(routes).forEach((m) => {
          throw new Error("STUB");
      })
    }
  }

  match: typeof match<Router<T>, T> = match

  protected buildAllMatchers(): MatcherMap<T> {
    const matchers: MatcherMap<T> = Object.create(null)

    Object.keys(this.#routes!)
      .concat(Object.keys(this.#middleware!))
      .forEach((method) => {
          throw new Error("STUB");
      })

    // Release cache
    this.#middleware = this.#routes = undefined
    clearWildcardRegExpCache()

    return matchers
  }

  #buildMatcher(method: string): Matcher<T> | null {
      throw new Error("STUB");
  }
}
