import type { Params } from '../../router'
import { METHOD_NAME_ALL } from '../../router'
import type { Pattern } from '../../utils/url'
import { getPattern, splitPath, splitRoutingPath } from '../../utils/url'

type HandlerSet<T> = {
  handler: T
  possibleKeys: string[]
  score: number
}

type HandlerParamsSet<T> = HandlerSet<T> & {
  params: Record<string, string>
}

const emptyParams = Object.create(null)

const hasChildren = (children: Record<string, unknown>): boolean => {
  for (const _ in children) {
    return true
  }
  return false
}

export class Node<T> {
  #methods: Record<string, HandlerSet<T>>[]

  #children: Record<string, Node<T>>
  #patterns: Pattern[]
  #order: number = 0
  #params: Record<string, string> = emptyParams

  constructor(method?: string, handler?: T, children?: Record<string, Node<T>>) {
      throw new Error("STUB");
  }

  insert(method: string, path: string, handler: T): Node<T> {
    this.#order = ++this.#order

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let curNode: Node<T> = this
    const parts = splitRoutingPath(path)

    const possibleKeys: string[] = []

    for (let i = 0, len = parts.length; i < len; i++) {
      const p: string = parts[i]
      const nextP = parts[i + 1]
      const pattern = getPattern(p, nextP)
      const key = Array.isArray(pattern) ? pattern[0] : p

      if (key in curNode.#children) {
        curNode = curNode.#children[key]
        if (pattern) {
          possibleKeys.push(pattern[1])
        }
        continue
      }

      curNode.#children[key] = new Node()

      if (pattern) {
        curNode.#patterns.push(pattern)
        possibleKeys.push(pattern[1])
      }
      curNode = curNode.#children[key]
    }

    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => { throw new Error("STUB"); }),
        score: this.#order,
      },
    })

    return curNode
  }

  #pushHandlerSets(
    handlerSets: HandlerParamsSet<T>[],
    node: Node<T>,
    method: string,
    nodeParams: Record<string, string>,
    params?: Record<string, string>
  ): void {
      throw new Error("STUB");
  }

  search(method: string, path: string): [[T, Params][]] {
    const handlerSets: HandlerParamsSet<T>[] = []
    this.#params = emptyParams

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const curNode: Node<T> = this
    let curNodes = [curNode]
    const parts = splitPath(path)
    const curNodesQueue: Node<T>[][] = []

    const len = parts.length
    let partOffsets: number[] | null = null

    for (let i = 0; i < len; i++) {
      const part: string = parts[i]
      const isLast = i === len - 1
      const tempNodes: Node<T>[] = []

      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j]
        const nextNode = node.#children[part]

        if (nextNode) {
          nextNode.#params = node.#params
          if (isLast) {
            // '/hello/*' => match '/hello'
            if (nextNode.#children['*']) {
              this.#pushHandlerSets(handlerSets, nextNode.#children['*'], method, node.#params)
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params)
          } else {
            tempNodes.push(nextNode)
          }
        }

        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k]
          const params = node.#params === emptyParams ? {} : { ...node.#params }

          // Wildcard
          // '/hello/*/foo' => match /hello/bar/foo
          if (pattern === '*') {
            const astNode = node.#children['*']
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params)
              astNode.#params = params
              tempNodes.push(astNode)
            }
            continue
          }

          const [key, name, matcher] = pattern

          if (!part && !(matcher instanceof RegExp)) {
            continue
          }

          const child = node.#children[key]

          // `/js/:filename{[a-z]+.js}` => match /js/chunk/123.js
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len)
              let offset = path[0] === '/' ? 1 : 0
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset
                offset += parts[p].length + 1
              }
            }
            const restPathString = path.substring(partOffsets[i])

            const m = matcher.exec(restPathString)
            if (m) {
              params[name] = m[0]
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params)

              // '/:id{[0-9]+}/*' => match '/123'
              if (m[0].length === restPathString.length && child.#children['*']) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children['*'],
                  method,
                  node.#params,
                  params
                )
              }

              if (hasChildren(child.#children)) {
                child.#params = params
                const componentCount = m[0].match(/\//)?.length ?? 0
                const targetCurNodes = (curNodesQueue[componentCount] ||= [])
                targetCurNodes.push(child)
              }

              continue
            }
          }

          if (matcher === true || matcher.test(part)) {
            params[name] = part
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params)
              if (child.#children['*']) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children['*'],
                  method,
                  params,
                  node.#params
                )
              }
            } else {
              child.#params = params
              tempNodes.push(child)
            }
          }
        }
      }

      const shifted = curNodesQueue.shift()
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes
    }

    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
          throw new Error("STUB");
      })
    }

    return [handlerSets.map(({ handler, params }) => { throw new Error("STUB"); })]
  }
}
