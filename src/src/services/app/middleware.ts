import { getCookie } from "hono/cookie"
import { decryptSession } from "./session"

/**
 * 認証ミドルウェア
 *
 * 役割:
 * - Cookie から session を取得
 * - セッションを復号して内容を確認
 * - 有効期限チェック
 * - 認証済みユーザー情報を Context に保存
 *
 * 成功時:
 *   c.set("user", session)
 *   次の処理へ進む
 *
 * 失敗時:
 *   401 Unauthorized を返す
 */
export async function auth(c: any, next: Function) {
  // Cookie から session という名前の値を取得
  const token = getCookie(c, "session")

  // Cookie が存在しない場合は未ログイン
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  try {
    // 暗号化された Cookie を復号してセッション情報取得
    const session = await decryptSession(token)

    // セッション期限切れチェック
    // exp はミリ秒想定（Date.now() と比較）
    if (session.exp < Date.now()) {
      return c.json({ error: "Expired" }, 401)
    }

    // 認証済みユーザー情報を Context に格納
    // 後続処理で c.get("user") で取得可能
    c.set("user", session)

    // 次の middleware / route handler へ進む
    await next()
  } catch {
    // 復号失敗・改ざん・形式不正など
    return c.json({ error: "Invalid Session" }, 401)
  }
}