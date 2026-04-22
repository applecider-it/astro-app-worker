import { Hono } from 'hono';
import { deleteCookie } from 'hono/cookie';

import type { AppHonoType } from '@/types/types';

import { sessionName } from '@/config/contants';

import { auth } from '@/services/app/middleware';
import { corsCookieOptions } from '@/services/app/cookie';
import { execLogin, startAuth, upsertGoogle } from '@/services/user/auth';
import { setupGoogleAuth, getProfileByCallback } from '@/services/user/google';

export const authRoute = new Hono<AppHonoType>();

// ログイン
authRoute.post('/login', async (c) => {
  const body = await c.req.json();

  const user = await execLogin(c, body.email, body.password);
  if (user) {
    await startAuth(c, user);

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

  const user = await upsertGoogle(c, profile);

  return c.json(profile);
});
