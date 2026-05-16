export interface IpInfo {
  ip:       string
  version:  'IPv4' | 'IPv6'
  country:  string
  countryCode: string
  city:     string
  isp:      string
  asn:      string
  timezone: string
  lat?:     number
  lon?:     number
}

export interface BrowserInfo {
  userAgent:  string
  os:         string
  browser:    string
  language:   string
  connection?: string
}

export interface NetworkInfo extends IpInfo, BrowserInfo {
  ipv6Available: boolean
  vpnDetected:   boolean
}

export function useNetworkInfo() {
  const data      = ref<Partial<NetworkInfo>>({})
  const loading   = ref(true)
  const error     = ref<string | null>(null)

  async function refresh() {
    loading.value = true
    error.value   = null
    try {
      const [ipData, browserData] = await Promise.all([
        $fetch<IpInfo>('/api/ip'),
        $fetch<BrowserInfo>('/api/browser'),
      ])
      data.value = { ...ipData, ...browserData }
    } catch (e: any) {
      error.value = e?.message || 'Erro ao buscar informações'
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, refresh }
}
