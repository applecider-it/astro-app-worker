import { Hono } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';
import { encryptSession } from '@/services/app/encryptSession';
import { auth } from '@/services/app/middleware';
import type { AppHonoType } from '@/types/types';
import { corsCookieOptions } from '@/services/app/cookie';
import { execLogin } from '@/services/user/auth';
import { sessionName } from '@/config/contants';
import { setupGoogleAuth, getProfileByCallback } from '@/services/user/google';

export const authRoute = new Hono<AppHonoType>();

// ログイン
authRoute.post('/login', async (c) => {
  const body = await c.req.json();

  const ret = await execLogin(c, body.email, body.password);
  if (ret) {
    const token = await encryptSession(ret);

    console.log({ token });

    setCookie(c, sessionName, token, corsCookieOptions);

    return c.json({ ok: true });
  }

  return c.json({ error: 'Login failed' }, 401);
});

// 認証ユーザー
authRoute.get('/me', auth, (c) => {
  return c.json(c.get('auth'));
});

// ログアウト
authRoute.post('/logout', (c) => {
  deleteCookie(c, sessionName, corsCookieOptions);
  return c.json({ ok: true });
});

// グーグル認証
authRoute.get('/google', async (c) => {
  const url = setupGoogleAuth(c);

  return c.redirect(url.toString());
});

// グーグル認証コールバック
authRoute.get('/google/callback', async (c) => {
  const profile = await getProfileByCallback(c);

  return c.json(profile);
});
