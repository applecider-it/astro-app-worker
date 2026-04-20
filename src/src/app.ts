import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { commentsRoute } from './routes/comments';
import { authRoute } from './routes/auth';

const app = new Hono<{ Bindings: Env }>();

app.use(
  '*',
  cors({
    origin: '*',
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  }),
);

app.route('/comments', commentsRoute);
app.route('/auth', authRoute);

export default app;
