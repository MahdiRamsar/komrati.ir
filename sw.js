const CACHE_NAME = 'komrati-v5';
const urlsToCache = [
    '/',
    '/index.html',
    '/images/vakil.webp',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap',
    '/manifest.json',
    // مقالات (۱۱ مقاله)
    '/blog/talaagh-tavaaghi.html',
    '/blog/kelahbari-interneti.html',
    '/blog/mehrieh-1405.html',
    '/blog/khal-e-yad.html',
    '/blog/chek-safteh.html',
    '/blog/ejareh-1405.html',
    '/blog/vahdat-877.html',
    '/blog/vahdat-878.html',
    '/blog/tahavolat-khanevadeh-1405.html',
    '/blog/vahdat-879-mavad-mokhader.html',
    '/blog/toolsfile-online-tools.html'  // مقاله جدید: ۱۰ ابزار آنلاین رایگان برای وکلا
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Caching assets - version', CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.warn('⚠️ Cache addAll failed:', err))
    );
});

// استراتژی Network-First برای صفحات اصلی و API
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // برای درخواست‌های API یا فرم‌ها، همیشه از شبکه استفاده کن
    if (url.pathname.startsWith('/api/') || url.pathname.includes('formspree')) {
        event.respondWith(fetch(request));
        return;
    }

    event.respondWith(
        fetch(request)
            .then(response => {
                // اگر پاسخ سالم بود، آن را در کش ذخیره کن
                if (response && response.status === 200 && request.method === 'GET') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, clone);
                    });
                }
                return response;
            })
            .catch(() => {
                // اگر شبکه در دسترس نبود، از کش استفاده کن
                return caches.match(request)
                    .then(cached => {
                        if (cached) return cached;
                        // اگر صفحه در کش نبود، صفحه آفلاین پیش‌فرض برگردان
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        return new Response('آفلاین', { status: 503 });
                    });
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});
