import { useCountries } from '../hooks/useCountries'
import { getCountryFlag } from '../utils/api'
import LoadingSpinner from './LoadingSpinner'

const CountryDropdown = ({ selectedCountry, onCountryChange }) => {
  const { data: countries, isLoading, error } = useCountries()

  if (isLoading) {
    return (
      <div className="country-dropdown-container">
        <LoadingSpinner message="Loading countries..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="country-dropdown-container">
        <div className="error-container">
          <h3 className="error-title">Failed to load countries</h3>
          <p className="error-message">
            {error.message || 'Please check your internet connection and try again.'}
          </p>
        </div>
      </div>
    )
  }

  if (!countries || countries.length === 0) {
    return (
      <div className="country-dropdown-container">
        <p className="no-holidays">No countries available</p>
      </div>
    )
  }

  // Helper function to extract text from name object
  const getCountryName = (country) => {
    if (typeof country.name === 'string') {
      return country.name
    }
    if (typeof country.name === 'object' && country.name?.text) {
      return country.name.text
    }
    return country.isoCode // fallback to ISO code
  }

  // Sort countries alphabetically by name
  const sortedCountries = [...countries].sort((a, b) => {
    const nameA = getCountryName(a)
    const nameB = getCountryName(b)
    return nameA.localeCompare(nameB)
  })

  return (
    <div className="country-dropdown-container">
      <label htmlFor="country-select" className="country-dropdown-label">
        🌍 Select a Country:
      </label>
      <select
        id="country-select"
        className="country-dropdown"
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
      >
        {sortedCountries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {getCountryFlag(country.isoCode)} {getCountryName(country)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CountryDropdown
