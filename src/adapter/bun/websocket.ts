import type { UpgradeWebSocket, WSEvents, WSMessageReceive } from '../../helper/websocket'
import { createWSMessageEvent, defineWebSocketHelper, WSContext } from '../../helper/websocket'
import { getBunServer } from './server'

/**
 * @internal
 */
export interface BunServerWebSocket<T> {
  send(data: string | ArrayBuffer | Uint8Array, compress?: boolean): void
  close(code?: number, reason?: string): void
  data: T
  readyState: 0 | 1 | 2 | 3
}

export interface BunWebSocketHandler<T> {
  open(ws: BunServerWebSocket<T>): void
  close(ws: BunServerWebSocket<T>, code?: number, reason?: string): void
  message(ws: BunServerWebSocket<T>, message: string | { buffer: ArrayBufferLike }): void
}
interface CreateWebSocket<T> {
  upgradeWebSocket: UpgradeWebSocket<T>
  websocket: BunWebSocketHandler<BunWebSocketData>
}
export interface BunWebSocketData {
  events: WSEvents
  url: URL
  protocol: string
}

/**
 * @internal
 */
export const createWSContext = (ws: BunServerWebSocket<BunWebSocketData>): WSContext => {
  return new WSContext({
    send: (source, options) => {
          throw new Error("STUB");
      },
    raw: ws,
    readyState: ws.readyState,
    url: ws.data.url,
    protocol: ws.data.protocol,
    close(code, reason) {
      ws.close(code, reason)
    },
  })
}

export const upgradeWebSocket: UpgradeWebSocket<any> = defineWebSocketHelper((c, events) => {
    throw new Error("STUB");
})

export const websocket: BunWebSocketHandler<BunWebSocketData> = {
  open(ws) {
    const websocketListeners = ws.data.events
    if (websocketListeners.onOpen) {
      websocketListeners.onOpen(new Event('open'), createWSContext(ws))
    }
  },
  close(ws, code, reason) {
    const websocketListeners = ws.data.events
    if (websocketListeners.onClose) {
      websocketListeners.onClose(
        new CloseEvent('close', {
          code,
          reason,
        }),
        createWSContext(ws)
      )
    }
  },
  message(ws, message) {
      throw new Error("STUB");
  },
}

/**
 * @deprecated Import `upgradeWebSocket` and `websocket` directly from `hono/bun` instead.
 * @returns A function to create a Bun WebSocket handler.
 */
export const createBunWebSocket = <T>(): CreateWebSocket<T> => { throw new Error("STUB"); }
