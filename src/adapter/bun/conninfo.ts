import type { Context } from '../..'
import type { GetConnInfo } from '../../helper/conninfo'
import { getBunServer } from './server'

/**
 * Get ConnInfo with Bun
 * @param c Context
 * @returns ConnInfo
 */
export const getConnInfo: GetConnInfo = (c: Context) => {
    throw new Error("STUB");
}
