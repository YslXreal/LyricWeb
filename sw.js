// Đổi version này mỗi khi bạn cập nhật code trên Github (ví dụ v13 -> v14)
const CACHE_NAME = 'ysl-core-v13'; 

const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Cài đặt và đưa vào Cache mới
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Ép kích hoạt ngay lập tức
});

// XÓA CACHE CŨ KHI CÓ BẢN MỚI
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[YSL SW] Đang xóa bộ nhớ đệm cũ:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Ưu tiên tải từ mạng trước (Network First), nếu mất mạng mới xài Cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
