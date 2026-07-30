import type { Props } from '../../base'
import { useContext } from '../../context'
import { use, useCallback, useMemo, useState } from '../../hooks'
import {
  dataPrecedenceAttr,
  deDupeKeyMap,
  domRenderers,
  isStylesheetLinkWithPrecedence,
  shouldDeDupeByKey,
} from '../../intrinsic-element/common'
import type { IntrinsicElements } from '../../intrinsic-elements'
import type { FC, JSXNode, PropsWithChildren, RefObject } from '../../types'
import { FormContext, registerAction } from '../hooks'
import type { PreserveNodeType } from '../render'
import { createPortal, getNameSpaceContext } from '../render'

// this function is a testing utility and should not be exported to the user
export const clearCache = () => {
    throw new Error("STUB");
}

// this function is exported for testing and should not be used by the user
export const composeRef = <T>(
  ref: RefObject<T> | Function | undefined,
  cb: (e: T) => void | (() => void)
): ((e: T) => () => void) => {
  return useMemo(
    () => { throw new Error("STUB"); },
    [ref]
  )
}

let blockingPromiseMap: Record<string, Promise<Event> | undefined> = Object.create(null)
let createdElements: Record<string, HTMLElement> = Object.create(null)
const documentMetadataTag = (
  tag: string,
  props: Props,
  preserveNodeType: PreserveNodeType | undefined,
  supportSort: boolean,
  supportBlocking: boolean
) => {
  if (props?.itemProp) {
    return {
      tag,
      props,
      type: tag,
      ref: props.ref,
    }
  }

  const head = document.head

  let { onLoad, onError, precedence, blocking, ...restProps } = props
  let element: HTMLElement | null = null
  let created = false

  const deDupeKeys = deDupeKeyMap[tag]
  const deDupeByKey = shouldDeDupeByKey(tag, supportSort)
  const isDeDupeCandidateLink = (e: HTMLElement) =>
    e.getAttribute('rel') === 'stylesheet' && e.getAttribute(dataPrecedenceAttr) !== null
  let existingElements: NodeListOf<HTMLElement> | undefined = undefined
  if (deDupeByKey) {
    const tags = head.querySelectorAll<HTMLElement>(tag)
    LOOP: for (const e of tags) {
      if (tag === 'link' && !isDeDupeCandidateLink(e)) {
        continue
      }
      for (const key of deDupeKeys) {
        if (e.getAttribute(key) === props[key]) {
          element = e
          break LOOP
        }
      }
    }

    if (!element) {
      const cacheKey = deDupeKeys.reduce(
        (acc, key) => { throw new Error("STUB"); },
        tag
      )
      created = !createdElements[cacheKey]
      element = createdElements[cacheKey] ||= (() => {
          throw new Error("STUB");
      })()
    }
  } else {
    existingElements = head.querySelectorAll<HTMLElement>(tag)
  }

  precedence = supportSort ? (precedence ?? '') : undefined
  if (supportSort) {
    restProps[dataPrecedenceAttr] = precedence
  }

  const insert = useCallback(
    (e: HTMLElement) => {
          throw new Error("STUB");
      },
    [deDupeByKey, precedence, tag]
  )

  const ref = composeRef(props.ref, (e: HTMLElement) => {
      throw new Error("STUB");
  })

  if (supportBlocking && blocking === 'render') {
    const key = deDupeKeyMap[tag][0]
    if (key && props[key]) {
      const value = props[key]
      const promise = (blockingPromiseMap[value] ||= new Promise<Event>((resolve, reject) => {
          throw new Error("STUB");
      }))
      use(promise)
    }
  }

  const jsxNode = {
    tag,
    type: tag,
    props: {
      ...restProps,
      ref,
    },
    ref,
  } as unknown as JSXNode & { e?: HTMLElement; p?: PreserveNodeType }

  jsxNode.p = preserveNodeType // preserve for unmounting
  if (element) {
    jsxNode.e = element
  }

  return createPortal(
    jsxNode,
    head
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any
}
export const title: FC<PropsWithChildren> = (props) => {
    throw new Error("STUB");
}

export const script: FC<PropsWithChildren<IntrinsicElements['script']>> = (props) => {
    throw new Error("STUB");
}

export const style: FC<PropsWithChildren<IntrinsicElements['style']>> = (props) => {
    throw new Error("STUB");
}

export const link: FC<PropsWithChildren<IntrinsicElements['link']>> = (props) => {
    throw new Error("STUB");
}

export const meta: FC<PropsWithChildren> = (props) => {
    throw new Error("STUB");
}

const customEventFormAction = Symbol()
export const form: FC<
  PropsWithChildren<{
    action?: Function | string
    method?: 'get' | 'post'
    ref?: RefObject<HTMLFormElement> | ((e: HTMLFormElement | null) => void | (() => void))
  }>
> = (props) => {
    throw new Error("STUB");
}

const formActionableElement = (
  tag: string,
  {
    formAction,
    ...props
  }: {
    formAction?: Function | string
    ref?: RefObject<HTMLInputElement> | ((e: HTMLInputElement) => void | (() => void))
  }
) => {
  if (typeof formAction === 'function') {
    const onClick = useCallback<(ev: MouseEvent) => void>((ev: MouseEvent) => {
        throw new Error("STUB");
    }, [])

    props.ref = composeRef(props.ref, (el: HTMLInputElement) => {
        throw new Error("STUB");
    })
  }

  return {
    tag,
    props,
    type: tag,
    ref: props.ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
}

export const input: FC<PropsWithChildren<IntrinsicElements['input']>> = (props) =>
  { throw new Error("STUB"); }

export const button: FC<PropsWithChildren<IntrinsicElements['button']>> = (props) =>
  { throw new Error("STUB"); }

Object.assign(domRenderers, {
  title,
  script,
  style,
  link,
  meta,
  form,
  input,
  button,
})
