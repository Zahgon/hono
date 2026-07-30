import type { ParamIndexMap, Result, Router } from '../../router'
import { METHOD_NAME_ALL } from '../../router'
import type { HandlerData, Matcher, MatcherMap, StaticMap } from './matcher'
import { match, emptyParam } from './matcher'
import { RegExpRouter } from './router'

type RelocateMap = Record<string, ([(number | string)[], ParamIndexMap] | [(number | string)[]])[]>

export class PreparedRegExpRouter<T> implements Router<T> {
  name: string = 'PreparedRegExpRouter'
  #matchers: MatcherMap<T>
  #relocateMap: RelocateMap

  constructor(matchers: MatcherMap<T>, relocateMap: RelocateMap) {
    this.#matchers = matchers
    this.#relocateMap = relocateMap
  }

  #addWildcard(method: string, handlerData: [T, ParamIndexMap]) {
      throw new Error("STUB");
  }

  #addPath(
    method: string,
    path: string,
    handler: T,
    indexes: (number | string)[],
    map: ParamIndexMap | undefined
  ) {
      throw new Error("STUB");
  }

  add(method: string, path: string, handler: T) {
    if (!this.#matchers[method]) {
      const all = this.#matchers[METHOD_NAME_ALL] as Matcher<T>
      const staticMap = {} as StaticMap<T>
      for (const key in all[2]) {
        staticMap[key] = [all[2][key][0].slice(), emptyParam] as Result<T>
      }
      this.#matchers[method] = [
        all[0],
        all[1].map((list) => { throw new Error("STUB"); }) as HandlerData<T>[],
        staticMap,
      ]
    }

    if (path === '/*' || path === '*') {
      const handlerData: [T, ParamIndexMap] = [handler, {}]
      if (method === METHOD_NAME_ALL) {
        for (const m in this.#matchers) {
          this.#addWildcard(m, handlerData)
        }
      } else {
        this.#addWildcard(method, handlerData)
      }
      return
    }

    const data = this.#relocateMap[path]
    if (!data) {
      throw new Error(`Path ${path} is not registered`)
    }
    for (const [indexes, map] of data) {
      if (method === METHOD_NAME_ALL) {
        for (const m in this.#matchers) {
          this.#addPath(m, path, handler, indexes, map)
        }
      } else {
        this.#addPath(method, path, handler, indexes, map)
      }
    }
  }

  protected buildAllMatchers(): MatcherMap<T> {
    return this.#matchers
  }

  match: typeof match<Router<T>, T> = match
}

export const buildInitParams: (params: {
  paths: string[]
}) => ConstructorParameters<typeof PreparedRegExpRouter> = ({ paths }) => {
    throw new Error("STUB");
}

export const serializeInitParams: (
  params: ConstructorParameters<typeof PreparedRegExpRouter>
) => string = ([matchers, relocateMap]) => {
    throw new Error("STUB");
}
