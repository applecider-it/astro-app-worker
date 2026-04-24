import { Hono } from 'hono';
import type { AppHonoType } from '@/types/types';
import { upgradeWebSocket } from 'hono/cloudflare-workers'

export const chatRoute = new Hono<AppHonoType>();

// チャット受信
chatRoute.get('/ws', upgradeWebSocket((c) => {
  return {
    onOpen(evt:any, ws:any) {
      console.log('connected')
    },
    onMessage(evt, ws) {
      ws.send(evt.data)
    },
    onClose(evt, ws) {
      console.log('closed')
    },
  }
}))
