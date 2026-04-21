import type { Context } from 'hono';
import type { AppHonoType } from '@/types/types';

import { Google } from 'arctic';
import { setCookie, getCookie } from 'hono/cookie';

/** Googleオブジェクト */
function getGoogle(c: Context<AppHonoType>) {
  const google = new Google(
    c.env.GOOGLE_CLIENT_ID,
    c.env.GOOGLE_CLIENT_SECRET,
    c.env.GOOGLE_CALLBACK,
  );

  return google;
}

/** Google認証のセットアップをしてURLを返す */
export function setupGoogleAuth(c: Context<AppHonoType>) {
  const google = getGoogle(c);

  const state = crypto.randomUUID();
  const codeVerifier = crypto.randomUUID();

  const cookieOptions = {
    httpOnly: true,
    secure: false, // local開発ならfalse
    path: '/',
    maxAge: 600,
  };

  setCookie(c, 'google_state', state, cookieOptions);
  setCookie(c, 'google_code_verifier', codeVerifier, cookieOptions);

  const url = google.createAuthorizationURL(state, codeVerifier, [
    'openid',
    'profile',
    'email',
  ]);

  return url.toString();
}

/** Google認証コールバックからプロファイル取得 */
export async function getProfileByCallback(c: Context<AppHonoType>) {
  const code = c.req.query('code');
  const state = c.req.query('state');
  const verifier = getCookie(c, 'google_code_verifier')!;

  const google = getGoogle(c);

  const tokens = await google.validateAuthorizationCode(code!, verifier);

  const accessToken = tokens.accessToken();

  const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const profile = await res.json();

  return profile;
}
