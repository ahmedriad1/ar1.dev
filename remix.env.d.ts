/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-workers/globals" />
/// <reference types="@cloudflare/workers-types" />

export {}
declare global {
  // kv namespaces
  const REDIRECTS: KVNamespace
  const CONTENT: KVNamespace

  // env
  const POST_API_KEY: string
  const COOKIE_SECRET: string
}
