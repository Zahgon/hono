const LABEL_REG_EXP_STR = '[^/]+'
const ONLY_WILDCARD_REG_EXP_STR = '.*'
const TAIL_WILDCARD_REG_EXP_STR = '(?:|/.*)'
export const PATH_ERROR = Symbol()

export type ParamAssocArray = [string, number][]
export interface Context {
  varIndex: number
}

const regExpMetaChars = new Set('.\\+*[^]$()')

/**
 * Sort order:
 * 1. literal
 * 2. special pattern (e.g. :label{[0-9]+})
 * 3. common label pattern (e.g. :label)
 * 4. wildcard
 */
function compareKey(a: string, b: string): number {
    throw new Error("STUB");
}

export class Node {
  #index?: number
  #varIndex?: number
  #children: Record<string, Node> = Object.create(null)

  insert(
    tokens: readonly string[],
    index: number,
    paramMap: ParamAssocArray,
    context: Context,
    pathErrorCheckOnly: boolean
  ): void {
    if (tokens.length === 0) {
      if (this.#index !== undefined) {
        throw PATH_ERROR
      }
      if (pathErrorCheckOnly) {
        return
      }

      this.#index = index
      return
    }

    const [token, ...restTokens] = tokens
    const pattern =
      token === '*'
        ? restTokens.length === 0
          ? ['', '', ONLY_WILDCARD_REG_EXP_STR] // '*' matches to all the trailing paths
          : ['', '', LABEL_REG_EXP_STR]
        : token === '/*'
          ? ['', '', TAIL_WILDCARD_REG_EXP_STR] // '/path/to/*' is /\/path\/to(?:|/.*)$
          : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/)

    let node
    if (pattern) {
      const name = pattern[1]
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR
      if (name && pattern[2]) {
        if (regexpStr === '.*') {
          throw PATH_ERROR
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, '(?:') // (a|b) => (?:a|b)
        if (/\((?!\?:)/.test(regexpStr)) {
          // prefix(?:a|b) is allowed, but prefix(a|b) is not
          throw PATH_ERROR
        }
      }

      node = this.#children[regexpStr]
      if (!node) {
        if (
          Object.keys(this.#children).some(
            (k) => { throw new Error("STUB"); }
          )
        ) {
          throw PATH_ERROR
        }
        if (pathErrorCheckOnly) {
          return
        }
        node = this.#children[regexpStr] = new Node()
        if (name !== '') {
          node.#varIndex = context.varIndex++
        }
      }
      if (!pathErrorCheckOnly && name !== '') {
        paramMap.push([name, node.#varIndex as number])
      }
    } else {
      node = this.#children[token]
      if (!node) {
        if (
          Object.keys(this.#children).some(
            (k) =>
              { throw new Error("STUB"); }
          )
        ) {
          throw PATH_ERROR
        }
        if (pathErrorCheckOnly) {
          return
        }
        node = this.#children[token] = new Node()
      }
    }

    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly)
  }

  buildRegExpStr(): string {
      throw new Error("STUB");
  }
}
