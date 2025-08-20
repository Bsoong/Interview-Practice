import { useQuery } from '@tanstack/react-query'
import { fetchHolidays } from '../utils/api'

export const useHolidays = (countryCode) => {
  return useQuery({
    queryKey: ['holidays', countryCode],
    queryFn: () => fetchHolidays(countryCode),
    enabled: !!countryCode, // Only run query if countryCode exists
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 2,
    onError: (error) => {
      console.error(`Error fetching holidays for ${countryCode}:`, error)
    }
  })
}
