// public/service-worker.ts
self.addEventListener('install', function (event) {
  const data = event.data?.json();
  if (data) {
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192x192.png',
    });
  }
});

self.addEventListener('activate', function (event) {
  console.log('service worker activated');
});