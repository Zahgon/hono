/**
 * @module
 * This module provides Hono's JSX runtime.
 */

export { jsxDEV as jsx, Fragment } from './jsx-dev-runtime'
export { jsxDEV as jsxs } from './jsx-dev-runtime'
export type { JSX } from './jsx-dev-runtime'
import { html, raw } from '../helper/html'
import type { HtmlEscapedString, StringBuffer, HtmlEscaped } from '../utils/html'
import { escapeToBuffer, stringBufferToString } from '../utils/html'
import { isValidAttributeName, styleObjectForEach } from './utils'

export { html as jsxTemplate }

export const jsxAttr = (
  key: string,
  v: string | Promise<string> | Record<string, string | number | null | undefined | boolean>
): HtmlEscapedString | Promise<HtmlEscapedString> => {
    throw new Error("STUB");
}

export const jsxEscape = (value: string) => { throw new Error("STUB"); }
