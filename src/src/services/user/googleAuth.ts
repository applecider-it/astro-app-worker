import type { Context } from 'hono';

import type { AppHonoType } from '@/types/types';

import { prepareBind } from '@/services/app/db';

import type { GoogleProfile } from './googleApi';

/** Google認証ユーザーのアップサート */
export async function upsertGoogle(
  c: Context<AppHonoType>,
  profile: GoogleProfile,
) {
  console.log({ profile });

  const user = await getUserByGoogle(c, profile.id);

  console.log({ user });

  if (user) {
    await updateUserByGoogle(c, profile);
  } else {
    await storeUserByGoogle(c, profile);
  }

  const resultUser = await getUserByGoogle(c, profile.id);

  return resultUser;
}

/** Google認証ユーザー更新 */
async function updateUserByGoogle(
  c: Context<AppHonoType>,
  profile: GoogleProfile,
) {
  const st = prepareBind(
    c,
    `
      UPDATE users SET
        email = ?,
        name = ?
      WHERE
        google_id = ?
      `,
    [profile.email, profile.name, profile.id],
  );
  const result = await st.run();
}

/** Google認証ユーザー追加 */
async function storeUserByGoogle(
  c: Context<AppHonoType>,
  profile: GoogleProfile,
) {
  const st = prepareBind(
    c,
    `
      INSERT INTO users
        (email, name, password_hash, google_id, auth_type)
      VALUES
        (?, ?, ?, ?, ?)
      `,
    [profile.email, profile.name, '', profile.id, 'google'],
  );
  const result = await st.run();
}

/** Google認証ユーザー取得 */
async function getUserByGoogle(c: Context<AppHonoType>, google_id: string) {
  const st = prepareBind(
    c,
    'SELECT * FROM users WHERE google_id = ? AND auth_type = ? LIMIT 1',
    [google_id, 'google'],
  );

  const user = await st.first();

  return user;
}
