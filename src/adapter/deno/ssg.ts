import { toSSG as baseToSSG } from '../../helper/ssg/index'
import type { FileSystemModule, ToSSGAdaptorInterface } from '../../helper/ssg/index'

/**
 * @experimental
 * `denoFileSystemModule` is an experimental feature.
 * The API might be changed.
 */
export const denoFileSystemModule: FileSystemModule = {
  writeFile: async (path, data) => {
        throw new Error("STUB");
    },
  mkdir: async (path, options) => {
      throw new Error("STUB");
  },
}

/**
 * @experimental
 * `toSSG` is an experimental feature.
 * The API might be changed.
 */
export const toSSG: ToSSGAdaptorInterface = async (app, options) => {
    throw new Error("STUB");
}
