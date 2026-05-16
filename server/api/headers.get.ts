export default defineEventHandler((event) => {
  const headers = getRequestHeaders(event)

  // Filter sensitive/irrelevant headers, show useful ones
  const relevant = [
    'user-agent', 'accept', 'accept-language', 'accept-encoding',
    'host', 'referer', 'origin', 'x-forwarded-for', 'x-real-ip',
    'cf-connecting-ip', 'cf-ray', 'cf-ipcountry', 'x-forwarded-proto',
    'sec-ch-ua', 'sec-ch-ua-platform', 'sec-ch-ua-mobile',
    'sec-fetch-site', 'sec-fetch-mode', 'sec-fetch-dest',
    'connection', 'cache-control', 'pragma',
  ]

  const filtered: Record<string, string> = {}
  for (const key of relevant) {
    if (headers[key]) filtered[key] = headers[key]
  }

  return { headers: filtered }
})
