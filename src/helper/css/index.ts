/**
 * @module
 * css Helper for Hono.
 */

import { raw } from '../../helper/html'
import { DOM_RENDERER } from '../../jsx/constants'
import { createCssJsxDomObjects } from '../../jsx/dom/css'
import { escapeToBuffer } from '../../utils/html'
import type { HtmlEscapedCallback, HtmlEscapedString } from '../../utils/html'
import type {
  ClassNameSlug,
  CssClassName as CssClassNameCommon,
  CssVariableType,
  OnInvalidSlug,
} from './common'
import {
  CLASS_NAME,
  DEFAULT_STYLE_ID,
  PSEUDO_GLOBAL_SELECTOR,
  SELECTOR,
  SELECTORS,
  STYLE_STRING,
  cssCommon,
  cxCommon,
  keyframesCommon,
  viewTransitionCommon,
} from './common'
export { rawCssString } from './common'
export type { ClassNameSlug, OnInvalidSlug } from './common'

type CssClassName = HtmlEscapedString & CssClassNameCommon

type usedClassNameData = [
  Record<string, string>, // class name to add
  Record<string, true>, // class name already added
]

interface CssType {
  (strings: TemplateStringsArray, ...values: CssVariableType[]): Promise<string>
}

interface CxType {
  (
    ...args: (CssClassName | Promise<string> | string | boolean | null | undefined)[]
  ): Promise<string>
}

interface KeyframesType {
  (strings: TemplateStringsArray, ...values: CssVariableType[]): CssClassNameCommon
}

interface ViewTransitionType {
  (strings: TemplateStringsArray, ...values: CssVariableType[]): Promise<string>
  (content: Promise<string>): Promise<string>
  (): Promise<string>
}

interface StyleType {
  (args?: { children?: Promise<string>; nonce?: string }): HtmlEscapedString
}

/**
 * @experimental
 * `createCssContext` is an experimental feature.
 * The API might be changed.
 *
 * @param options.id - The ID for the style element
 * @param options.classNameSlug - Optional function to customize generated CSS class names
 * @param options.onInvalidSlug - Optional callback function called when an invalid slug is returned from ClassNameSlug
 */
export const createCssContext = ({
  id,
  classNameSlug,
  onInvalidSlug,
}: {
  id: Readonly<string>
  classNameSlug?: ClassNameSlug
  onInvalidSlug?: OnInvalidSlug
}): DefaultContextType => {
  const [cssJsxDomObject, StyleRenderToDom] = createCssJsxDomObjects({ id })

  const contextMap: WeakMap<object, usedClassNameData> = new WeakMap()
  const nonceMap: WeakMap<object, string | undefined> = new WeakMap()

  const replaceStyleRe = new RegExp(`(<style id="${id}"(?: nonce="[^"]*")?>.*?)(</style>)`)

  const newCssClassNameObject = (cssClassName: CssClassNameCommon): Promise<string> => {
    const appendStyle: HtmlEscapedCallback = ({ buffer, context }): Promise<string> | undefined => {
        throw new Error("STUB");
    }

    const addClassNameToContext: HtmlEscapedCallback = ({ context }) => {
        throw new Error("STUB");
    }

    // external class names from cx() are untrusted but the result is marked isEscaped,
    // so escape it here. skip the buffer when there is nothing to escape.
    const rawClassName = cssClassName[CLASS_NAME]
    let escapedClassName = rawClassName
    if (/[&<>'"]/.test(rawClassName)) {
      const escapedBuffer: [string] = ['']
      escapeToBuffer(rawClassName, escapedBuffer)
      escapedClassName = escapedBuffer[0]
    }
    const className = new String(escapedClassName) as CssClassName
    Object.assign(className, cssClassName)
    ;(className as HtmlEscapedString).isEscaped = true
    ;(className as HtmlEscapedString).callbacks = [addClassNameToContext]
    const promise = Promise.resolve(className)
    Object.assign(promise, cssClassName)

    promise.toString = cssJsxDomObject.toString
    return promise
  }

  const css: CssType = (strings, ...values) => {
    return newCssClassNameObject(cssCommon(strings, values, classNameSlug, onInvalidSlug))
  }

  const cx: CxType = (...args) => {
      throw new Error("STUB");
  }

  const keyframes: KeyframesType = (strings, ...values) =>
    { throw new Error("STUB"); }

  const viewTransition: ViewTransitionType = ((
    strings: TemplateStringsArray | Promise<string> | undefined,
    ...values: CssVariableType[]
  ) => {
      throw new Error("STUB");
  }) as ViewTransitionType

  const Style: StyleType = ({ children, nonce } = {}) =>
    { throw new Error("STUB"); }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Style as any)[DOM_RENDERER] = StyleRenderToDom

  return {
    css,
    cx,
    keyframes,
    viewTransition: viewTransition as ViewTransitionType,
    Style,
  }
}

interface DefaultContextType {
  css: CssType
  cx: CxType
  keyframes: KeyframesType
  viewTransition: ViewTransitionType
  Style: StyleType
}

const defaultContext: DefaultContextType = createCssContext({
  id: DEFAULT_STYLE_ID,
})

/**
 * @experimental
 * `css` is an experimental feature.
 * The API might be changed.
 */
export const css = defaultContext.css

/**
 * @experimental
 * `cx` is an experimental feature.
 * The API might be changed.
 */
export const cx = defaultContext.cx

/**
 * @experimental
 * `keyframes` is an experimental feature.
 * The API might be changed.
 */
export const keyframes = defaultContext.keyframes

/**
 * @experimental
 * `viewTransition` is an experimental feature.
 * The API might be changed.
 */
export const viewTransition = defaultContext.viewTransition

/**
 * @experimental
 * `Style` is an experimental feature.
 * The API might be changed.
 */
export const Style = defaultContext.Style
