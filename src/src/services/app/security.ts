/** パスワードをハッシュ */
export async function hashPassword(password: string) {
  // パスワード文字列を UTF-8 バイト配列へ変換
  const data = new TextEncoder().encode(password);

  // SHA-256 でハッシュ化（ArrayBuffer が返る）
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // ArrayBuffer を byte配列へ変換
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // 各byteを16進数文字列へ変換し、連結してハッシュ文字列化
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // 64文字の16進数ハッシュを返す
  return hashHex;
}