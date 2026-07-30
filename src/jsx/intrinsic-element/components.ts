import { raw } from '../../helper/html'
import type { HtmlEscapedCallback, HtmlEscapedString } from '../../utils/html'
import { JSXNode, getNameSpaceContext } from '../base'
import type { Child, Props } from '../base'
import { toArray } from '../children'
import { PERMALINK } from '../constants'
import { useContext } from '../context'
import type { IntrinsicElements } from '../intrinsic-elements'
import type { FC, PropsWithChildren } from '../types'
import {
  dataPrecedenceAttr,
  deDupeKeyMap,
  isStylesheetLinkWithPrecedence,
  shouldDeDupeByKey,
} from './common'

const metaTagMap: WeakMap<
  object,
  Record<string, [string, Props, string | undefined][]>
> = new WeakMap()
const insertIntoHead: (
  tagName: string,
  tag: string,
  props: Props,
  precedence: string | undefined
) => HtmlEscapedCallback =
  (tagName, tag, props, precedence) =>
  ({ buffer, context }): undefined => {
      throw new Error("STUB");
  }

const returnWithoutSpecialBehavior = (tag: string, children: Child, props: Props) =>
  raw(new JSXNode(tag, props, toArray(children ?? [])).toString())

const documentMetadataTag = (tag: string, children: Child, props: Props, sort: boolean) => {
  if ('itemProp' in props) {
    return returnWithoutSpecialBehavior(tag, children, props)
  }

  let { precedence, blocking, ...restProps } = props
  precedence = sort ? (precedence ?? '') : undefined
  if (sort) {
    restProps[dataPrecedenceAttr] = precedence
  }

  const string = new JSXNode(tag, restProps, toArray(children || [])).toString()

  if (string instanceof Promise) {
    return string.then((resString) =>
      { throw new Error("STUB"); }
    )
  } else {
    return raw(string, [insertIntoHead(tag, string, restProps, precedence)])
  }
}

export const title: FC<PropsWithChildren> = ({ children, ...props }) => {
    throw new Error("STUB");
}
export const script: FC<PropsWithChildren<IntrinsicElements['script']>> = ({
  children,
  ...props
}) => {
    throw new Error("STUB");
}

export const style: FC<PropsWithChildren<IntrinsicElements['style']>> = ({
  children,
  ...props
}) => {
    throw new Error("STUB");
}
export const link: FC<PropsWithChildren<IntrinsicElements['link']>> = ({ children, ...props }) => {
    throw new Error("STUB");
}
export const meta: FC<PropsWithChildren> = ({ children, ...props }) => {
    throw new Error("STUB");
}

const newJSXNode = (tag: string, { children, ...props }: PropsWithChildren<unknown>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new JSXNode(tag, props, toArray(children ?? []) as Child[]) as any
export const form: FC<
  PropsWithChildren<{
    action?: Function | string
    method?: 'get' | 'post'
  }>
> = (props) => {
    throw new Error("STUB");
}

const formActionableElement = (
  tag: string,
  props: PropsWithChildren<{
    formAction?: Function | string
  }>
) => {
  if (typeof props.formAction === 'function') {
    props.formAction =
      PERMALINK in props.formAction ? (props.formAction[PERMALINK] as string) : undefined
  }
  return newJSXNode(tag, props)
}

export const input: (props: PropsWithChildren) => unknown = (props) =>
  { throw new Error("STUB"); }
export const button: (props: PropsWithChildren) => unknown = (props) =>
  { throw new Error("STUB"); }
