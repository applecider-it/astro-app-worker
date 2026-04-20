import { Hono } from "hono"
import { setCookie, deleteCookie } from "hono/cookie"
import { encryptSession } from "../services/app/session"
import { auth } from "../services/app/middleware"
import type { AppVariables } from "../types/types"

export const authRoute = new Hono<{ Bindings: Env, Variables: AppVariables }>();

// ログイン
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

// 認証ユーザー
authRoute.get("/me", auth, (c) => {
  return c.json(c.get("user"))
})

// ログアウト
authRoute.post("/logout", (c) => {
  deleteCookie(c, "session")
  return c.json({ ok: true })
})
