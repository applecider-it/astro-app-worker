import type { Context } from 'hono';
import type { AppHonoType } from '@/types/types';

import { formatFullDatetime } from '@/services/data/date';

/** DB実行前処理 */
export function prepareBind(
  c: Context<AppHonoType>,
  sql: string,
  bindings: any[],
) {
  console.log(formatFullDatetime(new Date) + ': SQL: ', sql, bindings)
  return c.env.DB.prepare(sql).bind(...bindings);
}
