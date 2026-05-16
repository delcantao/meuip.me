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
  const isIPv6 = ip.includes(':')

  try {
    const geo = await $fetch<any>(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,isp,as,timezone`).catch(() => null)

    return {
      ip,
      version:     isIPv6 ? 'IPv6' : 'IPv4',
      ipv6Available: isIPv6,
      country:     geo?.country     || '',
      countryCode: geo?.countryCode || '',
      city:        geo?.city        || '',
      isp:         geo?.isp         || '',
      asn:         geo?.as          || '',
      timezone:    geo?.timezone    || '',
      vpnDetected: false, // mock: integrate with ipqualityscore/etc in prod
    }
  } catch {
    return { ip, version: isIPv6 ? 'IPv6' : 'IPv4', ipv6Available: isIPv6, vpnDetected: false }
  }
})
