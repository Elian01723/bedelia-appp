// Service Worker de Bedelía U: permite instalar la app y abrirla aunque no haya internet.
// Para limpiar cachés viejas basta con cambiar VERSION (la página se actualiza sola cuando hay internet).
const VERSION = 'bedelia-v1';
const BASE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(BASE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // La base de datos en la nube NUNCA se guarda en caché
  if (url.hostname.indexOf('firebaseio.com') !== -1 || url.pathname.slice(-5) === '.json') return;

  // La página: primero internet (así cada actualización de GitHub llega sola); sin internet, la copia guardada
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put('index.html', copy); });
        return res;
      }).catch(function () { return caches.match('index.html'); })
    );
    return;
  }

  // Resto (estilos, íconos, librerías): copia guardada y se refresca en segundo plano
  e.respondWith(
    caches.match(req).then(function (cached) {
      const red = fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || red;
    })
  );
});
