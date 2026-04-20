import type { CookieOptions } from "hono/utils/cookie";

export const corsCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  path: '/',
  sameSite: 'None',
};
