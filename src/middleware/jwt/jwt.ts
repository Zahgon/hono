/**
 * @module
 * JWT Auth Middleware for Hono.
 */

import type { Context } from '../../context'
import { getCookie, getSignedCookie } from '../../helper/cookie'
import { HTTPException } from '../../http-exception'
import type { MiddlewareHandler } from '../../types'
import type { CookiePrefixOptions } from '../../utils/cookie'
import { Jwt } from '../../utils/jwt'
import '../../context'
import type { SignatureAlgorithm } from '../../utils/jwt/jwa'
import type { SignatureKey } from '../../utils/jwt/jws'
import type { VerifyOptions } from '../../utils/jwt/jwt'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JwtVariables<T = any> = {
  jwtPayload: T
}

/**
 * JWT Auth Middleware for Hono.
 *
 * @see {@link https://hono.dev/docs/middleware/builtin/jwt}
 *
 * @param {object} options - The options for the JWT middleware.
 * @param {SignatureKey} options.secret - A value of your secret key.
 * @param {string} [options.cookie] - If this value is set, then the value is retrieved from the cookie header using that value as a key, which is then validated as a token.
 * @param {SignatureAlgorithm} options.alg - An algorithm type that is used for verifying (required). Available types are `HS256` | `HS384` | `HS512` | `RS256` | `RS384` | `RS512` | `PS256` | `PS384` | `PS512` | `ES256` | `ES384` | `ES512` | `EdDSA`.
 * @param {string} [options.headerName='Authorization'] - The name of the header to look for the JWT token. Default is 'Authorization'.
 * @param {VerifyOptions} [options.verification] - Additional options for JWT payload verification.
 * @returns {MiddlewareHandler} The middleware handler function.
 *
 * @example
 * ```ts
 * const app = new Hono()
 *
 * app.use(
 *   '/auth/*',
 *   jwt({
 *     secret: 'it-is-very-secret',
 *     alg: 'HS256',
 *     headerName: 'x-custom-auth-header', // Optional, default is 'Authorization'
 *   })
 * )
 *
 * app.get('/auth/page', (c) => {
 *   return c.text('You are authorized')
 * })
 * ```
 */
export const jwt = (options: {
  secret: SignatureKey
  cookie?:
    | string
    | { key: string; secret?: string | BufferSource; prefixOptions?: CookiePrefixOptions }
  alg: SignatureAlgorithm
  headerName?: string
  verification?: VerifyOptions
}): MiddlewareHandler => {
    throw new Error("STUB");
}

function unauthorizedResponse(opts: {
  ctx: Context
  error: string
  errDescription: string
  statusText?: string
}) {
  return new Response('Unauthorized', {
    status: 401,
    statusText: opts.statusText,
    headers: {
      'WWW-Authenticate': `Bearer realm="${opts.ctx.req.url}",error="${opts.error}",error_description="${opts.errDescription}"`,
    },
  })
}

export const verifyWithJwks = Jwt.verifyWithJwks
export const verify = Jwt.verify
export const decode = Jwt.decode
export const sign = Jwt.sign
