/**
 * analytics.client.ts
 *
 * Loads Google Analytics (GA4), Google Tag Manager, and Bing Webmaster
 * verification ONLY when the corresponding env vars are set.
 *
 * Set via environment variables (e.g. in .env or Vercel/Cloudflare dashboard):
 *   NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *   NUXT_PUBLIC_GTM_ID=GTM-XXXXXXX
 *   NUXT_PUBLIC_BING_ID=<bing-verification-code>
 *
 * No scripts are injected when variables are empty — no tracking without
 * explicit opt-in.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const gaId   = config.public.gaId   as string
  const gtmId  = config.public.gtmId  as string
  const bingId = config.public.bingId as string

  // ── Google Analytics 4 ───────────────────────────────────────────────────
  if (gaId) {
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
          async: true,
          defer: true,
        },
        {
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true,cookie_flags:'SameSite=None;Secure'});`,
        },
      ],
    })
  }

  // ── Google Tag Manager ───────────────────────────────────────────────────
  if (gtmId && !gaId) {
    // Only inject GTM if GA is not already loaded (avoid double-tracking)
    useHead({
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
        },
      ],
    })
  }

  // ── Bing Webmaster Tools verification ────────────────────────────────────
  if (bingId) {
    useHead({
      meta: [
        { name: 'msvalidate.01', content: bingId },
      ],
    })
  }
})
