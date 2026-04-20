/** ログイン処理 */
export async function execLogin(email: string, password: string) {
  if (email === 'test@localhost.com' && password === 'testtest') {
    return {
      id: 1,
      email: email,
      exp: Date.now() + 1000 * 60 * 60 * 24,
    };
  }
  return null;
}
