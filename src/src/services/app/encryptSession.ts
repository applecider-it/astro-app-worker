/**
 * セッション暗号化用の秘密鍵
 *
 * AES-GCM は 128 / 192 / 256 bit の鍵長のみ使用可能。
 * この例では 32文字（= 32byte想定）で AES-256 として利用。
 *
 * 本番環境では直書きせず、
 * Cloudflare Workers Secrets / env から取得推奨。
 */
const SECRET = "your-super-secret-key-32chars!!!"

/**
 * 暗号化・復号に使う CryptoKey を生成する
 *
 * importKey("raw") により文字列秘密鍵を
 * Web Crypto API 用の鍵オブジェクトへ変換する。
 */
async function getKey() {
  return crypto.subtle.importKey(
    "raw",

    // 文字列 → バイト列へ変換
    new TextEncoder().encode(SECRET),

    // 使用アルゴリズム
    "AES-GCM",

    // export不可（鍵を外へ取り出せない）
    false,

    // この鍵で許可する操作
    ["encrypt", "decrypt"]
  )
}

/**
 * セッション情報を暗号化して Cookie 保存用文字列へ変換
 *
 * @param data セッション情報
 * 例:
 * {
 *   id: 1,
 *   email: "test@test.com",
 *   exp: 9999999999999
 * }
 *
 * @returns Base64文字列
 */
export async function encryptSession(data: object) {
  // 秘密鍵取得
  const key = await getKey()

  /**
   * IV（初期化ベクトル）
   *
   * AES-GCM では毎回ランダム値が必要。
   * 12byte が一般的。
   */
  const iv = crypto.getRandomValues(new Uint8Array(12))

  // オブジェクト → JSON文字列 → バイト列
  const encoded = new TextEncoder().encode(JSON.stringify(data))

  // 暗号化実行
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  )

  /**
   * 保存形式:
   * [ iv(12byte) + 暗号文 ]
   *
   * 復号時に IV が必要なので先頭に連結して保存する
   */
  const merged = new Uint8Array(iv.length + encrypted.byteLength)

  merged.set(iv)
  merged.set(new Uint8Array(encrypted), iv.length)

  // Cookie保存しやすいよう Base64 化
  return btoa(String.fromCharCode(...merged))
}

/**
 * Cookie文字列からセッション情報を復号する
 *
 * @param token Cookieに保存された Base64文字列
 * @returns 元のセッションオブジェクト
 */
export async function decryptSession(token: string) {
  // Base64 → バイト列へ戻す
  const raw = Uint8Array.from(
    atob(token),
    c => c.charCodeAt(0)
  )

  /**
   * 先頭12byte = IV
   * 残り = 暗号文
   */
  const iv = raw.slice(0, 12)
  const body = raw.slice(12)

  // 秘密鍵取得
  const key = await getKey()

  // 復号
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    body
  )

  // バイト列 → JSON文字列 → オブジェクト
  return JSON.parse(
    new TextDecoder().decode(plain)
  )
}