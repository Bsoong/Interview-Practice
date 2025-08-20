import axios from 'axios'

const BASE_URL = 'https://openholidaysapi.org'

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API functions
export const fetchCountries = async () => {
  const response = await api.get('/Countries', {
    params: {
      languageIsoCode: 'en'
    }
  })
  return response.data
}

export const fetchHolidays = async (countryCode) => {
  const currentYear = new Date().getFullYear()
  const response = await api.get('/PublicHolidays', {
    params: {
      countryIsoCode: countryCode,
      languageIsoCode: 'en',
      validFrom: `${currentYear}-01-01`,
      validTo: `${currentYear}-12-31`
    }
  })
  return response.data
}

// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Helper function to get country flag emoji
export const getCountryFlag = (countryCode) => {
  const flagMap = {
    'NL': '🇳🇱',
    'US': '🇺🇸', 
    'GB': '🇬🇧',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
    'ES': '🇪🇸',
    'IT': '🇮🇹',
    'CA': '🇨🇦',
    'AU': '🇦🇺',
    'JP': '🇯🇵',
    'CN': '🇨🇳',
    'IN': '🇮🇳',
    'BR': '🇧🇷',
    'MX': '🇲🇽',
    'RU': '🇷🇺',
    'ZA': '🇿🇦',
    'KR': '🇰🇷',
    'NO': '🇳🇴',
    'SE': '🇸🇪',
    'DK': '🇩🇰',
    'FI': '🇫🇮',
    'AT': '🇦🇹',
    'CH': '🇨🇭',
    'BE': '🇧🇪',
    'PL': '🇵🇱',
    'CZ': '🇨🇿',
    'HU': '🇭🇺',
    'PT': '🇵🇹',
    'GR': '🇬🇷',
    'TR': '🇹🇷',
    'IE': '🇮🇪',
    'IL': '🇮🇱',
    'EG': '🇪🇬',
    'SA': '🇸🇦',
    'AE': '🇦🇪',
    'SG': '🇸🇬',
    'TH': '🇹🇭',
    'MY': '🇲🇾',
    'ID': '🇮🇩',
    'PH': '🇵🇭',
    'VN': '🇻🇳',
    'NZ': '🇳🇿',
    'AR': '🇦🇷',
    'CL': '🇨🇱',
    'PE': '🇵🇪',
    'CO': '🇨🇴',
    'VE': '🇻🇪'
  }
  return flagMap[countryCode] || '🏁'
}
