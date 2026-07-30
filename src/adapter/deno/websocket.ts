import type { UpgradeWebSocket, WSReadyState } from '../../helper/websocket'
import { WSContext, defineWebSocketHelper } from '../../helper/websocket'

export const upgradeWebSocket: UpgradeWebSocket<WebSocket, Deno.UpgradeWebSocketOptions> =
  defineWebSocketHelper(async (c, events, options) => {
      throw new Error("STUB");
  })
