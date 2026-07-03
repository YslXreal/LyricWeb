// FILE NÀY CHỈ CÓ 1 NHIỆM VỤ: TIÊU DIỆT TOÀN BỘ CACHE CŨ VÀ TỰ HỦY BẢN THÂN

self.addEventListener('install', function(e) {
  self.skipWaiting(); // Ép kích hoạt ngay lập tức
});

self.addEventListener('activate', function(e) {
  // 1. Quét sạch sẽ toàn bộ kho chứa Cache cũ
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[YSL CLEANER] Đã tiêu diệt cache:', key);
        return caches.delete(key);
      }));
    })
  );
  
  // 2. Ép trình duyệt phải tải phiên bản web mới nhất từ máy chủ (Github)
  self.clients.claim();
});

// 3. Cho phép TẤT CẢ các luồng mạng chạy thẳng, không giữ lại cái gì, tránh lỗi "null"
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
