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

export default defineEventHandler((event) => {
  const ip = getRealIp(event)
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'no-store')
  return ip
})
