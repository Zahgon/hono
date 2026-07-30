import { replaceUrlParam } from '../../client/utils'
import type { Hono } from '../../hono'
import type { Env, Schema } from '../../types'
import { createPool } from '../../utils/concurrent'
import { getExtension } from '../../utils/mime'
import type { AddedSSGDataRequest, SSGParams } from './middleware'
import { SSG_CONTEXT, X_HONO_DISABLE_SSG_HEADER_KEY } from './middleware'
import { defaultPlugin } from './plugins'
import {
  dirname,
  ensureWithinOutDir,
  filterStaticGenerateRoutes,
  isDynamicRoute,
  joinPaths,
} from './utils'

const DEFAULT_CONCURRENCY = 2 // default concurrency for ssg

// 'default_content_type' is designed according to Bun's performance optimization,
//  which omits Content-Type by default for text responses.
//  This is based on benchmarks showing performance gains without Content-Type.
//  In Hono, using `c.text()` without a Content-Type implicitly assumes 'text/plain; charset=UTF-8'.
//  This approach maintains performance consistency across different environments.
//  For details, see GitHub issues: oven-sh/bun#8530 and https://github.com/honojs/hono/issues/2284.
const DEFAULT_CONTENT_TYPE = 'text/plain'

export const DEFAULT_OUTPUT_DIR = './static'

/**
 * @experimental
 * `FileSystemModule` is an experimental feature.
 * The API might be changed.
 */
export interface FileSystemModule {
  writeFile(path: string, data: string | Uint8Array): Promise<void>
  mkdir(path: string, options: { recursive: boolean }): Promise<void | string>
}

/**
 * @experimental
 * `ToSSGResult` is an experimental feature.
 * The API might be changed.
 */
export interface ToSSGResult {
  success: boolean
  files: string[]
  error?: Error
}

const generateFilePath = (
  routePath: string,
  outDir: string,
  mimeType: string,
  extensionMap?: Record<string, string>
): string => {
  const extension = determineExtension(mimeType, extensionMap)

  let filePath: string
  if (routePath.endsWith(`.${extension}`)) {
    filePath = joinPaths(outDir, routePath)
  } else if (routePath === '/') {
    filePath = joinPaths(outDir, `index.${extension}`)
  } else if (routePath.endsWith('/')) {
    filePath = joinPaths(outDir, routePath, `index.${extension}`)
  } else {
    filePath = joinPaths(outDir, `${routePath}.${extension}`)
  }

  ensureWithinOutDir(outDir, filePath)

  return filePath
}

const parseResponseContent = async (response: Response): Promise<string | ArrayBuffer> => {
  const contentType = response.headers.get('Content-Type')

  try {
    if (contentType?.includes('text') || contentType?.includes('json')) {
      return await response.text()
    } else {
      return await response.arrayBuffer()
    }
  } catch (error) {
    throw new Error(
      `Error processing response: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

export const defaultExtensionMap: Record<string, string> = {
  'text/html': 'html',
  'text/xml': 'xml',
  'application/xml': 'xml',
  'application/atom+xml': 'xml',
  'application/rss+xml': 'xml',
  'application/yaml': 'yaml',
}

const determineExtension = (
  mimeType: string,
  userExtensionMap?: Record<string, string>
): string => {
  const extensionMap = userExtensionMap || defaultExtensionMap
  if (mimeType in extensionMap) {
    return extensionMap[mimeType]
  }
  return getExtension(mimeType) || 'html'
}

export type BeforeRequestHook = (req: Request) => Request | false | Promise<Request | false>
export type AfterResponseHook = (res: Response) => Response | false | Promise<Response | false>
export type AfterGenerateHook = (
  result: ToSSGResult,
  fsModule: FileSystemModule,
  options?: ToSSGOptions
) => void | Promise<void>

export const combineBeforeRequestHooks = (
  hooks: BeforeRequestHook | BeforeRequestHook[]
): BeforeRequestHook => {
  if (!Array.isArray(hooks)) {
    return hooks
  }
  return async (req: Request): Promise<Request | false> => {
      throw new Error("STUB");
  }
}

export const combineAfterResponseHooks = (
  hooks: AfterResponseHook | AfterResponseHook[]
): AfterResponseHook => {
  if (!Array.isArray(hooks)) {
    return hooks
  }
  return async (res: Response): Promise<Response | false> => {
      throw new Error("STUB");
  }
}

export const combineAfterGenerateHooks = (
  hooks: AfterGenerateHook | AfterGenerateHook[],
  fsModule: FileSystemModule,
  options?: ToSSGOptions
): AfterGenerateHook => {
  if (!Array.isArray(hooks)) {
    return hooks
  }
  return async (result: ToSSGResult): Promise<void> => {
      throw new Error("STUB");
  }
}

export interface SSGPlugin {
  beforeRequestHook?: BeforeRequestHook | BeforeRequestHook[]
  afterResponseHook?: AfterResponseHook | AfterResponseHook[]
  afterGenerateHook?: AfterGenerateHook | AfterGenerateHook[]
}

export interface ToSSGOptions {
  dir?: string
  /**
   * @deprecated Use plugins[].beforeRequestHook instead.
   */
  beforeRequestHook?: BeforeRequestHook | BeforeRequestHook[]
  /**
   * @deprecated Use plugins[].afterResponseHook instead.
   */
  afterResponseHook?: AfterResponseHook | AfterResponseHook[]
  /**
   * @deprecated Use plugins[].afterGenerateHook instead.
   */
  afterGenerateHook?: AfterGenerateHook | AfterGenerateHook[]
  concurrency?: number
  extensionMap?: Record<string, string>
  plugins?: SSGPlugin[]
}

/**
 * @experimental
 * `fetchRoutesContent` is an experimental feature.
 * The API might be changed.
 */
export const fetchRoutesContent = function* <
  E extends Env = Env,
  S extends Schema = {},
  BasePath extends string = '/',
>(
  app: Hono<E, S, BasePath>,
  beforeRequestHook?: BeforeRequestHook,
  afterResponseHook?: AfterResponseHook,
  concurrency?: number
): Generator<
  Promise<
    | Generator<
        Promise<{ routePath: string; mimeType: string; content: string | ArrayBuffer } | undefined>
      >
    | undefined
  >
> {
  const baseURL = 'http://localhost'
  const pool = createPool({ concurrency })

  for (const route of filterStaticGenerateRoutes(app)) {
    // GET Route Info
    const thisRouteBaseURL = new URL(route.path, baseURL).toString()

    let forGetInfoURLRequest = new Request(thisRouteBaseURL) as AddedSSGDataRequest

    // eslint-disable-next-line no-async-promise-executor
    yield new Promise(async (resolveGetInfo, rejectGetInfo) => {
        throw new Error("STUB");
    })
  }
}

/**
 * @experimental
 * `saveContentToFile` is an experimental feature.
 * The API might be changed.
 */
const createdDirs: Set<string> = new Set()
export const saveContentToFile = async (
  data: Promise<{ routePath: string; content: string | ArrayBuffer; mimeType: string } | undefined>,
  fsModule: FileSystemModule,
  outDir: string,
  extensionMap?: Record<string, string>
): Promise<string | undefined> => {
  const awaitedData = await data
  if (!awaitedData) {
    return
  }
  const { routePath, content, mimeType } = awaitedData
  const filePath = generateFilePath(routePath, outDir, mimeType, extensionMap)
  const dirPath = dirname(filePath)

  if (!createdDirs.has(dirPath)) {
    await fsModule.mkdir(dirPath, { recursive: true })
    createdDirs.add(dirPath)
  }
  if (typeof content === 'string') {
    await fsModule.writeFile(filePath, content)
  } else if (content instanceof ArrayBuffer) {
    await fsModule.writeFile(filePath, new Uint8Array(content))
  }
  return filePath
}

/**
 * @experimental
 * `ToSSGInterface` is an experimental feature.
 * The API might be changed.
 */
export interface ToSSGInterface {
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app: Hono<any, any, any>,
    fsModule: FileSystemModule,
    options?: ToSSGOptions
  ): Promise<ToSSGResult>
}

/**
 * @experimental
 * `ToSSGAdaptorInterface` is an experimental feature.
 * The API might be changed.
 */
export interface ToSSGAdaptorInterface<
  E extends Env = Env,
  S extends Schema = {},
  BasePath extends string = '/',
> {
  (app: Hono<E, S, BasePath>, options?: ToSSGOptions): Promise<ToSSGResult>
}

/**
 * @experimental
 * `toSSG` is an experimental feature.
 * The API might be changed.
 */
export const toSSG: ToSSGInterface = async (app, fs, options) => {
    throw new Error("STUB");
}
