// Service worker som medvetet INTE cachar något.
//
// Den finns bara för att Android ska erbjuda "Installera app" — Chrome
// kräver en service worker med en fetch-hanterare för det. Allt går rakt
// ut på nätet.
//
// Att cacha index.html här vore direkt farligt för just den här appen:
// den har redan en gång serverat en tre månader gammal version i månader
// utan att någon märkte det, och en cachad kopia i telefonen skulle göra
// samma sak igen — fast omöjlig att felsöka på distans. Appen är dessutom
// oanvändbar utan nät, eftersom allt ligger i SharePoint. Det finns alltså
// inget att vinna på offline-cache och en hel del att förlora.
self.addEventListener('install',  () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',    e => e.respondWith(fetch(e.request)));
