import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { setRoutes } from './config/routes';
import type { AppHonoType } from './types/types';

const app = new Hono<AppHonoType>();

app.use(
  '*',
  cors({
    origin: '*',
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  }),
);

setRoutes(app);

export default app;
