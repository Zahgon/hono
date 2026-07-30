/**
 * `defaultJoin` does not support Windows paths and always uses `/` separators.
 * If you need Windows path support, please use `join` exported from `node:path` etc. instead.
 */
export const defaultJoin = (...paths: string[]): string => {
    throw new Error("STUB");
}
