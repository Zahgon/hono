import type { Context, ParamAssocArray } from './node'
import { Node } from './node'

export type ReplacementMap = number[]

export class Trie {
  #context: Context = { varIndex: 0 }
  #root: Node = new Node()

  insert(path: string, index: number, pathErrorCheckOnly: boolean): ParamAssocArray {
    const paramAssoc: ParamAssocArray = []

    const groups: [string, string][] = [] // [mark, original string]
    for (let i = 0; ; ) {
      let replaced = false
      path = path.replace(/\{[^}]+\}/g, (m) => {
          throw new Error("STUB");
      })
      if (!replaced) {
        break
      }
    }

    /**
     *  - pattern (:label, :label{0-9]+}, ...)
     *  - /* wildcard
     *  - character
     */
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || []
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i]
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1])
          break
        }
      }
    }

    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly)

    return paramAssoc
  }

  buildRegExp(): [RegExp, ReplacementMap, ReplacementMap] {
      throw new Error("STUB");
  }
}
