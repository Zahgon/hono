/**
 * @module
 * Concurrent utility.
 */

const DEFAULT_CONCURRENCY = 1024

export interface Pool {
  run<T>(fn: () => T): Promise<T>
}

export const createPool = ({
  concurrency,
  interval,
}: {
  concurrency?: number
  interval?: number
} = {}): Pool => {
  concurrency ||= DEFAULT_CONCURRENCY

  if (concurrency === Infinity) {
    // unlimited
    return {
      run: async (fn) => { throw new Error("STUB"); },
    }
  }

  const pool: Set<{}> = new Set()
  const run = async <T>(
    fn: () => T,
    promise?: Promise<T>,
    resolve?: (result: T) => void
  ): Promise<T> => {
    if (pool.size >= (concurrency as number)) {
      promise ||= new Promise<T>((r) => { throw new Error("STUB"); })
      setTimeout(() => { throw new Error("STUB"); })
      return promise
    }
    const marker = {}
    pool.add(marker)
    const result = await fn()
    if (interval) {
      setTimeout(() => { throw new Error("STUB"); }, interval)
    } else {
      pool.delete(marker)
    }
    if (resolve) {
      resolve(result)
      return promise as Promise<T>
    } else {
      return result
    }
  }
  return { run }
}
