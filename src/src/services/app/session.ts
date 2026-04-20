const SECRET = "your-super-secret-key-32chars!!!"

async function getKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    "AES-GCM",
    false,
    ["encrypt", "decrypt"]
  )
}

export async function encryptSession(data: object) {
  const key = await getKey()
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const encoded = new TextEncoder().encode(JSON.stringify(data))

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  )

  const merged = new Uint8Array(iv.length + encrypted.byteLength)
  merged.set(iv)
  merged.set(new Uint8Array(encrypted), iv.length)

  return btoa(String.fromCharCode(...merged))
}

export async function decryptSession(token: string) {
  const raw = Uint8Array.from(atob(token), c => c.charCodeAt(0))
  const iv = raw.slice(0, 12)
  const body = raw.slice(12)

  const key = await getKey()

  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    body
  )

  return JSON.parse(new TextDecoder().decode(plain))
}