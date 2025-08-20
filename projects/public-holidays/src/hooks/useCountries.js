import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../utils/api'

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - countries don't change often
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 2,
    onError: (error) => {
      console.error('Error fetching countries:', error)
    }
  })
}
