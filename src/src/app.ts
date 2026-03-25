import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { commentsRoute } from './routes/comments'

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}))

app.route('/comments', commentsRoute)

export default app