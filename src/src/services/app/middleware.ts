import { getCookie } from "hono/cookie"
import { decryptSession } from "./session"

export async function auth(c:any, next: Function) {
  const token = getCookie(c, "session")

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  try {
    const session = await decryptSession(token)

    if (session.exp < Date.now()) {
      return c.json({ error: "Expired" }, 401)
    }

    c.set("user", session)
    await next()
  } catch {
    return c.json({ error: "Invalid Session" }, 401)
  }
}