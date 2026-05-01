const CACHE_NAME = "teacherly-shell-v1"
const APP_SCOPE = self.registration.scope
const APP_SHELL = [
  new URL("index.html", APP_SCOPE).toString(),
  new URL("manifest.webmanifest", APP_SCOPE).toString(),
  new URL("pwa-icon.svg", APP_SCOPE).toString(),
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) return

  if (event.request.mode === "navigate") {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) =>
            cache.put(new URL("index.html", APP_SCOPE).toString(), copy)
          )
        return response
      })
      .catch(() => caches.match(new URL("index.html", APP_SCOPE).toString()))
  )
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse

      return fetch(event.request).then((response) => {
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
        return response
      })
    })
  )
})
