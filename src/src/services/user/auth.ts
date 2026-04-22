import type { Context } from 'hono';
import { setCookie } from 'hono/cookie';

import type { AppHonoType } from '@/types/types';

import { sessionName } from '@/config/contants';

import { encryptSession } from '@/services/app/encryptSession';
import { corsCookieOptions } from '@/services/app/cookie';
import { prepareBind } from '@/services/app/db';

import { hashPassword } from '@/services/app/security';

/** ログイン処理 */
export async function execLogin(
  c: Context<AppHonoType>,
  email: string,
  password: string,
) {
  const st = prepareBind(c, 'SELECT * FROM users WHERE email = ? LIMIT 1', [
    email,
  ]);
  const user = await st.first();

  if (!user) return null;

  if (user.password_hash === (await hashPassword(password))) {
    delete user.password_hash;
    return user;
  }
  return null;
}

/** 認証開始 */
export async function startAuth(
  c: Context<AppHonoType>,
  user: Record<string, unknown>,
) {
  const ret = {
    user,
    exp: Date.now() + 1000 * 60 * 60 * 24,
  };
  const token = await encryptSession(ret);

  console.log({ token });

  setCookie(c, sessionName, token, corsCookieOptions);
}
