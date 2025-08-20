import { useState } from 'react'
import CountryDropdown from './components/CountryDropdown'
import HolidaysList from './components/HolidaysList'
import './App.css'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('NL') // Default to Netherlands

  return (
    <div className="app-container">
      <div className="paper container">
        <header className="app-header">
          <h1 className="app-title">🎉 Public Holidays</h1>
          <p className="app-subtitle">
            Discover national holidays around the world
          </p>
        </header>

        <main className="app-main">
          <div className="controls-section">
            <CountryDropdown
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
          </div>

          <div className="holidays-section">
            <HolidaysList countryCode={selectedCountry} />
          </div>
        </main>

        <footer className="app-footer">
          <p>
            Data provided by{' '}
            <a 
              href="https://openholidaysapi.org/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              OpenHolidays API
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
