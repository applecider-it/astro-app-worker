import { Hono } from "hono"
import { setCookie, deleteCookie } from "hono/cookie"
import { encryptSession } from "../services/app/session"
import { auth } from "../services/app/middleware"

export const authRoute = new Hono<{ Bindings: Env }>();

authRoute.post("/login", async (c) => {
  const body = await c.req.json()

  if (
    body.email === "test@localhost.com" &&
    body.password === "testtest"
  ) {
    const token = await encryptSession({
      id: 1,
      email: body.email,
      exp: Date.now() + 1000 * 60 * 60 * 24
    })

    console.log({token})

    setCookie(c, "session", token, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "Lax"
    })

    return c.json({ ok: true })
  }

  return c.json({ error: "Login failed" }, 401)
})

authRoute.get("/me", auth, (c) => {
  return c.json(c.get("user"))
})

authRoute.post("/logout", (c) => {
  deleteCookie(c, "session")
  return c.json({ ok: true })
})
