// 서비스 워커: 파일을 캐시에 저장해서 인터넷 없이도 열리게 한다.
// 전략: 네트워크 우선. 온라인이면 항상 서버에 최신 파일인지 확인하고(문제를 고치면 바로 반영),
//       오프라인이면 마지막으로 받아둔 캐시를 보여준다.
const CACHE = 'cs-review-box-v2';
const FILES = ['./', './index.html', './questions.js', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;   // 글꼴 같은 외부 파일은 브라우저에 맡긴다

  e.respondWith(
    // cache: 'no-cache' = 브라우저에 저장된 파일이 있어도 서버에 바뀌었는지 먼저 물어본다
    fetch(e.request.url, { cache: 'no-cache' })
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
