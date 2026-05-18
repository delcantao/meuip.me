// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://meuip.me'

export default defineNuxtConfig({
  compatibilityDate: '2024-09-15',
  devtools: { enabled: false },

  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
  ],

  i18n: {
    baseUrl: SITE_URL,
    locales: [
      { code: 'pt', language: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
    ],
    lazy: true,
    langDir: '../locales',
    defaultLocale: 'pt',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // @nuxtjs/sitemap v5 — auto-discovers i18n routes and page routes
  sitemap: {
    sitemaps: false,
    strictNuxtContentPaths: false,
    urls: [
      { loc: '/',              lastmod: new Date().toISOString(), changefreq: 'daily',   priority: 1.0 },
      { loc: '/what-is-my-ip', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
      { loc: '/ipv6-test',     lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
      { loc: '/dns-leak-test', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
      { loc: '/browser-info',  lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.7 },
      { loc: '/headers',       lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.7 },
      { loc: '/webrtc-test',   lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    ],
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { name: 'theme-color', content: '#0f172a' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'meuip.me' },
        // Default OG/Twitter card (overridden per-page)
        { property: 'og:site_name', content: 'meuip.me' },
        { property: 'og:type',      content: 'website' },
        { name: 'twitter:card',     content: 'summary_large_image' },
        { name: 'twitter:site',     content: '@meuipme' },
      ],
      script: [
        // Anti-flicker: apply theme class before paint
        {
          innerHTML: `(function(){var t=localStorage.getItem('meuipme_theme')||'system';var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.classList.add(r);document.documentElement.setAttribute('data-theme',r);})();`,
          type: 'text/javascript',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon',  href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    },
  },

  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/api/**':          { cors: true, headers: { 'cache-control': 'no-store' } },
      '/sitemap.xml':     { headers: { 'cache-control': 's-maxage=3600, stale-while-revalidate' } },
      '/robots.txt':      { headers: { 'cache-control': 's-maxage=86400' } },
      '/manifest.json':   { headers: { 'cache-control': 's-maxage=86400' } },
      // Static utility pages – cache HTML at CDN for 10 min, bg revalidate
      '/what-is-my-ip':   { headers: { 'cache-control': 's-maxage=600, stale-while-revalidate=300' } },
      '/ipv6-test':       { headers: { 'cache-control': 's-maxage=600, stale-while-revalidate=300' } },
      '/dns-leak-test':   { headers: { 'cache-control': 's-maxage=600, stale-while-revalidate=300' } },
      '/browser-info':    { headers: { 'cache-control': 's-maxage=600, stale-while-revalidate=300' } },
      '/headers':         { headers: { 'cache-control': 's-maxage=600, stale-while-revalidate=300' } },
      '/webrtc-test':     { headers: { 'cache-control': 's-maxage=600, stale-while-revalidate=300' } },
      '/**':              { headers: { 'x-frame-options': 'SAMEORIGIN', 'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin' } },
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      // Analytics — set via env vars; left empty so no tracking fires without explicit opt-in
      gaId:   process.env.NUXT_PUBLIC_GA_ID   || '',
      gtmId:  process.env.NUXT_PUBLIC_GTM_ID  || '',
      bingId: process.env.NUXT_PUBLIC_BING_ID || '',
    },
  },
})
