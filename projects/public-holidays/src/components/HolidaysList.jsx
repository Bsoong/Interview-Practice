import { useHolidays } from '../hooks/useHolidays'
import { useCountries } from '../hooks/useCountries'
import { formatDate, getCountryFlag } from '../utils/api'
import LoadingSpinner from './LoadingSpinner'

const HolidaysList = ({ countryCode }) => {
  const { data: holidays, isLoading: holidaysLoading, error: holidaysError } = useHolidays(countryCode)
  const { data: countries } = useCountries()

  // Helper function to extract text from name object
  const getDisplayName = (nameObj) => {
    if (typeof nameObj === 'string') {
      return nameObj
    }
    if (typeof nameObj === 'object' && nameObj?.text) {
      return nameObj.text
    }
    return ''
  }

  // Find the country name for display
  const country = countries?.find(c => c.isoCode === countryCode)
  const countryName = country?.name ? getDisplayName(country.name) : countryCode
  const currentYear = new Date().getFullYear()

  if (holidaysLoading) {
    const displayName = country?.name ? getDisplayName(country.name) : countryCode
    return <LoadingSpinner message={`Loading holidays for ${displayName}...`} />
  }

  if (holidaysError) {
    return (
      <div className="error-container">
        <h3 className="error-title">Failed to load holidays</h3>
        <p className="error-message">
          Could not load holidays for {countryName}. 
          {holidaysError.message && ` Error: ${holidaysError.message}`}
        </p>
      </div>
    )
  }

  if (!holidays || holidays.length === 0) {
    return (
      <div className="holidays-container">
        <h2>
          {getCountryFlag(countryCode)} {countryName} - {currentYear}
        </h2>
        <p className="no-holidays">
          No public holidays found for {countryName} in {currentYear}.
        </p>
      </div>
    )
  }

  // Sort holidays by date
  const sortedHolidays = [...holidays].sort((a, b) => 
    new Date(a.startDate) - new Date(b.startDate)
  )

  // Group holidays by month for better organization
  const holidaysByMonth = sortedHolidays.reduce((acc, holiday) => {
    const month = new Date(holiday.startDate).toLocaleDateString('en-US', { 
      month: 'long' 
    })
    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(holiday)
    return acc
  }, {})

  return (
    <div className="holidays-container">
      <h2>
        {getCountryFlag(countryCode)} {countryName} - {currentYear}
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Found {holidays.length} public holiday{holidays.length !== 1 ? 's' : ''}
      </p>

      {Object.entries(holidaysByMonth).map(([month, monthHolidays]) => (
        <div key={month} style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            color: '#667eea', 
            borderBottom: '2px solid #667eea', 
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>
            {month}
          </h3>
          <div className="holidays-grid">
            {monthHolidays.map((holiday, index) => (
              <div key={`${holiday.id || index}`} className="holiday-card">
                <div className="holiday-name">
                  {getDisplayName(holiday.name)}
                </div>
                <div className="holiday-date">
                  📅 {formatDate(holiday.startDate)}
                </div>
                {holiday.type && (
                  <div className="holiday-type">
                    {holiday.type}
                  </div>
                )}
                {holiday.nationwide !== undefined && (
                  <div style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.9rem', 
                    color: holiday.nationwide ? '#28a745' : '#ffc107' 
                  }}>
                    {holiday.nationwide ? '🌍 Nationwide' : '📍 Regional'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default HolidaysList
