import type { H3Event } from 'h3'

function getRealIp(event: H3Event): string {
  const headers = getRequestHeaders(event)
  return (
    headers['cf-connecting-ip'] ||
    headers['x-real-ip'] ||
    (headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    getRequestIP(event, { xForwardedFor: true }) ||
    '0.0.0.0'
  )
}

export default defineEventHandler(async (event) => {
  const ip = getRealIp(event)

  // Detect IPv4 vs IPv6
  const isIPv6 = ip.includes(':')
  const version = isIPv6 ? 'IPv6' : 'IPv4'

  try {
    const geoUrl = `http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,isp,as,timezone,lat,lon`
    const geo = await $fetch<any>(geoUrl, { timeout: 3000 }).catch(() => null)

    return {
      ip,
      version,
      country:     geo?.country     || 'Desconhecido',
      countryCode: geo?.countryCode || '',
      city:        geo?.city        || 'Desconhecida',
      isp:         geo?.isp         || 'Desconhecido',
      asn:         geo?.as          || '',
      timezone:    geo?.timezone    || '',
      lat:         geo?.lat,
      lon:         geo?.lon,
    }
  } catch {
    return {
      ip,
      version,
      country:     'Desconhecido',
      countryCode: '',
      city:        'Desconhecida',
      isp:         'Desconhecido',
      asn:         '',
      timezone:    '',
    }
  }
})
