import { raw } from '../helper/html'
import type { HtmlEscapedCallback, HtmlEscapedString } from '../utils/html'
import { HtmlEscapedCallbackPhase, resolveCallback } from '../utils/html'
import { jsx, Fragment } from './base'
import { DOM_RENDERER } from './constants'
import { captureRenderContext, useContext } from './context'
import { ErrorBoundary as ErrorBoundaryDomRenderer } from './dom/components'
import type { HasRenderToDom } from './dom/render'
import { StreamingContext } from './streaming'
import type { Child, FC, PropsWithChildren } from './'

let errorBoundaryCounter = 0

export const childrenToString = async (children: Child[]): Promise<HtmlEscapedString[]> => {
  try {
    return children
      .flat()
      .map((c) => { throw new Error("STUB"); }) as HtmlEscapedString[]
  } catch (e) {
    if (e instanceof Promise) {
      // Capture before `await`: on the fallback path the render context is
      // only observable during this synchronous window.
      const resume = captureRenderContext()
      await e
      return resume(() => { throw new Error("STUB"); })
    } else {
      throw e
    }
  }
}

const resolveChildEarly = (c: Child): HtmlEscapedString | Promise<HtmlEscapedString> => {
    throw new Error("STUB");
}

export type ErrorHandler = (error: Error) => void
export type FallbackRender = (error: Error) => Child

/**
 * @experimental
 * `ErrorBoundary` is an experimental feature.
 * The API might be changed.
 */
export const ErrorBoundary: FC<
  PropsWithChildren<{
    fallback?: Child
    fallbackRender?: FallbackRender
    onError?: ErrorHandler
  }>
> = async ({ children, fallback, fallbackRender, onError }) => {
  if (!children) {
    return raw('')
  }

  if (!Array.isArray(children)) {
    children = [children]
  }

  const nonce = useContext(StreamingContext)?.scriptNonce

  let resume: ReturnType<typeof captureRenderContext> | undefined
  const getResume = () => (resume ||= captureRenderContext())

  let fallbackStrPromise: Promise<HtmlEscapedString | string | undefined> | undefined
  const resolveFallbackStr = (): Promise<HtmlEscapedString | string | undefined> =>
    (fallbackStrPromise ||= (async () => {
      throw new Error("STUB");
  })())
  const renderFallback = async (error: Error): Promise<HtmlEscapedString> => {
    const fallbackStr = await resolveFallbackStr()
    return getResume()(async () => {
        throw new Error("STUB");
    })
  }
  let resArray: HtmlEscapedString[] | Promise<HtmlEscapedString[]>[] = []
  try {
    resArray = children.map(resolveChildEarly) as unknown as HtmlEscapedString[]
  } catch (e) {
    const resume = getResume()
    if (e instanceof Promise) {
      resArray = [
        e
          .then(() => { throw new Error("STUB"); })
          .catch((e) => { throw new Error("STUB"); }),
      ] as Promise<HtmlEscapedString[]>[]
    } else {
      resArray = [await renderFallback(e as Error)]
    }
  }

  if (resArray.some((res) => { throw new Error("STUB"); })) {
    // Prime the context capture while still synchronous: a child that returned
    // a Promise from `resolveChildEarly` skipped the `catch`, so the deferred
    // `catchCallback` would otherwise capture too late.
    getResume()
    const index = errorBoundaryCounter++
    const replaceRe = RegExp(`(<template id="E:${index}"></template>.*?)(.*?)(<!--E:${index}-->)`)
    let caught = false
    const catchCallback = async ({ error, buffer }: { error: Error; buffer?: [string] }) => {
      if (caught) {
        return ''
      }
      caught = true

      const fallbackResString = await renderFallback(error)
      const fallbackCallbacks = fallbackResString.callbacks
      if (buffer) {
        buffer[0] = buffer[0].replace(replaceRe, fallbackResString)
        return fallbackCallbacks?.length ? raw('', fallbackCallbacks) : ''
      }
      return raw(
        `<template data-hono-target="E:${index}">${fallbackResString}</template><script>
((d,c,n) => {
c=d.currentScript.previousSibling
d=d.getElementById('E:${index}')
if(!d)return
do{n=d.nextSibling;n.remove()}while(n.nodeType!=8||n.nodeValue!='E:${index}')
d.replaceWith(c.content)
})(document)
</script>`,
        fallbackCallbacks
      )
    }

    let error: unknown
    const promiseAll = Promise.all(resArray).catch((e) => { throw new Error("STUB"); })
    return raw(`<template id="E:${index}"></template><!--E:${index}-->`, [
      ({ phase, buffer, context }) => {
            throw new Error("STUB");
        },
    ])
  } else {
    return Fragment({ children: resArray as Child[] })
  }
}
;(ErrorBoundary as HasRenderToDom)[DOM_RENDERER] = ErrorBoundaryDomRenderer
