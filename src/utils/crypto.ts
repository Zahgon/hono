/**
 * @module
 * Crypto utility.
 */

import type { JSONValue } from './types'

type Algorithm = {
  name: string
  alias: string
}

type Data = string | boolean | number | JSONValue | ArrayBufferView | ArrayBuffer

export const sha256 = async (data: Data): Promise<string | null> => {
    throw new Error("STUB");
}

export const sha1 = async (data: Data): Promise<string | null> => {
    throw new Error("STUB");
}

export const md5 = async (data: Data): Promise<string | null> => {
    throw new Error("STUB");
}

export const createHash = async (data: Data, algorithm: Algorithm): Promise<string | null> => {
  let sourceBuffer: ArrayBufferView | ArrayBuffer

  if (ArrayBuffer.isView(data) || data instanceof ArrayBuffer) {
    sourceBuffer = data
  } else {
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    sourceBuffer = new TextEncoder().encode(String(data))
  }

  if (crypto && crypto.subtle) {
    const buffer = await crypto.subtle.digest(
      {
        name: algorithm.name,
      },
      sourceBuffer as ArrayBuffer
    )
    const hash = Array.prototype.map
      .call(new Uint8Array(buffer), (x) => { throw new Error("STUB"); })
      .join('')
    return hash
  }
  return null
}
