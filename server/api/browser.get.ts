function parseUserAgent(ua: string) {
  // Lightweight UA parsing without external lib
  let os = 'Desconhecido'
  let browser = 'Desconhecido'

  if (/windows/i.test(ua))          os = 'Windows'
  else if (/macintosh|mac os/i.test(ua)) os = 'macOS'
  else if (/iphone/i.test(ua))      os = 'iOS'
  else if (/ipad/i.test(ua))        os = 'iPadOS'
  else if (/android/i.test(ua))     os = 'Android'
  else if (/linux/i.test(ua))       os = 'Linux'
  else if (/cros/i.test(ua))        os = 'ChromeOS'

  if (/edg\//i.test(ua))            browser = 'Microsoft Edge'
  else if (/opr\/|opera/i.test(ua)) browser = 'Opera'
  else if (/brave/i.test(ua))       browser = 'Brave'
  else if (/chrome/i.test(ua))      browser = 'Chrome'
  else if (/safari/i.test(ua))      browser = 'Safari'
  else if (/firefox/i.test(ua))     browser = 'Firefox'
  else if (/msie|trident/i.test(ua)) browser = 'Internet Explorer'

  return { os, browser }
}

export default defineEventHandler((event) => {
  const ua = getRequestHeader(event, 'user-agent') || ''
  const accept = getRequestHeader(event, 'accept-language') || ''
  const { os, browser } = parseUserAgent(ua)

  return {
    userAgent: ua,
    os,
    browser,
    language: accept.split(',')[0] || 'Desconhecido',
  }
})
