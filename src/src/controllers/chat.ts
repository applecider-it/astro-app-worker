import { Hono } from 'hono';
import type { AppHonoType } from '@/types/types';

export const chatRoute = new Hono<AppHonoType>();

// WebSocketエンドポイント
chatRoute.get('/ws/:room', async (c) => {
  const room = c.req.param('room')

  // ルーム名からDurable ObjectのIDを生成
  // 同じroom名なら常に同じインスタンスに紐づく
  const id = c.env.CHAT.idFromName(room)

  // Durable Objectのスタブ（リモート参照）を取得
  const stub = c.env.CHAT.get(id)

  // c.req.rawで、Honoでラップされる前のRequestを渡す
  return stub.fetch(c.req.raw)
})