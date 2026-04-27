import type { Context } from 'hono';
import type { AppHonoType } from '@/types/types';

/**
 * Durable Objectクラス（チャットルーム1部屋を表す）
 */
export class ChatRoom {
  /** 接続中のWebSocketを保持するセット */
  sockets: Set<any>;

  constructor(c: Context<AppHonoType>) {
    // インスタンスごとに接続一覧を初期化
    this.sockets = new Set();
  }

  /** 外部からのリクエストを処理（Workerからstub.fetchで呼ばれる） */
  fetch(request: Request) {
    // WebSocketのペアを作成（client側とserver側）
    const pair = new WebSocketPair();
    const client = pair[0]; // クライアントに返す
    const server = pair[1]; // サーバー側で保持・操作する

    // サーバー側WebSocketを有効化
    server.accept();

    // 接続を一覧に追加（この部屋に参加）
    this.sockets.add(server);

    // メッセージ受信時の処理
    server.addEventListener('message', (e) => {
      // この部屋の全クライアントにブロードキャスト
      for (const ws of this.sockets) {
        ws.send(e.data);
      }
    });

    // WebSocket接続をクライアントに返す（HTTP 101 Switching Protocols）
    return new Response(null, { status: 101, webSocket: client });
  }
}