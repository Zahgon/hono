import type { ParamIndexMap, Result, Router } from '../../router'
import { METHOD_NAME_ALL } from '../../router'

export type HandlerData<T> = [T, ParamIndexMap][]
export type StaticMap<T> = Record<string, Result<T>>
export type Matcher<T> = [RegExp, HandlerData<T>[], StaticMap<T>]
export type MatcherMap<T> = Record<string, Matcher<T> | null>

export const emptyParam: string[] = []
export function match<R extends Router<T>, T>(this: R, method: string, path: string): Result<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matchers: MatcherMap<T> = (this as any).buildAllMatchers()

  const match = ((method, path) => {
      throw new Error("STUB");
  }) as Router<T>['match']

  this.match = match
  return match(method, path)
}
