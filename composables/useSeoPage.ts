/**
 * useSeoPage — central composable for per-page SEO setup.
 *
 * Handles:
 *  - useSeoMeta (title, description, OG, Twitter)
 *  - canonical URL
 *  - hreflang alternate links (pt-BR, en, es, zh-CN + x-default)
 *  - JSON-LD script injection (accepts one or more schema objects)
 *
 * Usage:
 *   useSeoPage({
 *     title:       'What is my IP? | meuip.me',
 *     description: '…',
 *     path:        '/what-is-my-ip',   // relative, without locale prefix
 *     jsonLd:      [{ '@context': …, '@type': 'WebPage', … }],
 *   })
 */

interface SeoPageOptions {
  title: string | (() => string)
  description: string | (() => string)
  /** Canonical path, e.g. '/what-is-my-ip'. Defaults to '/' */
  path?: string
  /** Override OG image (defaults to /og-image.svg) */
  ogImage?: string
  /** One or more JSON-LD schema objects */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  /** Extra robots directive, defaults to 'index, follow' */
  robots?: string
  /** Extra keywords (optional) */
  keywords?: string
}

const BASE_URL = 'https://meuip.me'

/** Hreflang map: nuxtjs/i18n strategy is prefix_except_default (pt = no prefix) */
const HREFLANG: Record<string, string> = {
  'pt-BR': '',
  'en':    '/en',
  'es':    '/es',
  'zh-CN': '/zh',
}

export function useSeoPage(opts: SeoPageOptions) {
  const path      = opts.path ?? '/'
  const canonical = `${BASE_URL}${path}`
  const ogImage   = opts.ogImage ?? `${BASE_URL}/og-image.svg`

  // ── Meta ──────────────────────────────────────────────────────────────────
  useSeoMeta({
    title:              opts.title,
    description:        opts.description,
    ogTitle:            opts.title,
    ogDescription:      opts.description,
    ogUrl:              canonical,
    ogType:             'website',
    ogImage,
    ogImageWidth:       '1200',
    ogImageHeight:      '630',
    twitterCard:        'summary_large_image',
    twitterTitle:       opts.title,
    twitterDescription: opts.description,
    twitterImage:       ogImage,
    robots:             opts.robots ?? 'index, follow',
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
  })

  // ── Canonical + hreflang ──────────────────────────────────────────────────
  const hreflangLinks = Object.entries(HREFLANG).map(([lang, prefix]) => ({
    rel:      'alternate',
    hreflang: lang,
    href:     `${BASE_URL}${prefix}${path}`,
  }))

  // x-default points to the default (pt) version
  const xDefaultLink = {
    rel:      'alternate',
    hreflang: 'x-default',
    href:     `${BASE_URL}${path}`,
  }

  const scripts = Array.isArray(opts.jsonLd)
    ? opts.jsonLd
    : opts.jsonLd
      ? [opts.jsonLd]
      : []

  useHead({
    link: [
      { rel: 'canonical', href: canonical },
      ...hreflangLinks,
      xDefaultLink,
    ],
    ...(scripts.length
      ? {
          script: scripts.map(schema => ({
            type: 'application/ld+json',
            innerHTML: JSON.stringify(schema),
          })),
        }
      : {}),
  })
}

// ── Shared JSON-LD builders ──────────────────────────────────────────────────

export function jsonLdOrganization() {
  return {
    '@context':   'https://schema.org',
    '@type':      'Organization',
    name:         'meuip.me',
    url:          BASE_URL,
    description:  'Free public IP address lookup — location, ISP, IPv6, DNS leak & WebRTC tests.',
    logo:         `${BASE_URL}/favicon.svg`,
    sameAs:       [],
  }
}

export function jsonLdWebSite() {
  return {
    '@context':        'https://schema.org',
    '@type':           'WebSite',
    name:              'meuip.me',
    url:               BASE_URL,
    description:       'Discover your public IP address, geolocation, ISP and privacy tools — fast, free, no tracking.',
    inLanguage:        ['pt-BR', 'en', 'es', 'zh-CN'],
    potentialAction: {
      '@type':       'SearchAction',
      target:        { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function jsonLdWebApplication(opts: { name: string; description: string; url: string }) {
  return {
    '@context':           'https://schema.org',
    '@type':              'WebApplication',
    name:                 opts.name,
    url:                  opts.url,
    description:          opts.description,
    applicationCategory:  'UtilityApplication',
    operatingSystem:      'Any',
    browserRequirements:  'Requires JavaScript',
    inLanguage:           ['pt-BR', 'en', 'es', 'zh-CN'],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: jsonLdOrganization(),
  }
}

export function jsonLdWebPage(opts: { name: string; description: string; url: string; breadcrumbs?: Array<{ name: string; url: string }> }) {
  return {
    '@context':   'https://schema.org',
    '@type':      'WebPage',
    name:         opts.name,
    url:          opts.url,
    description:  opts.description,
    isPartOf:     { '@type': 'WebSite', url: BASE_URL, name: 'meuip.me' },
    ...(opts.breadcrumbs?.length
      ? {
          breadcrumb: {
            '@type':           'BreadcrumbList',
            itemListElement: opts.breadcrumbs.map((crumb, idx) => ({
              '@type':   'ListItem',
              position:  idx + 1,
              name:      crumb.name,
              item:      crumb.url,
            })),
          },
        }
      : {}),
  }
}
