# Public Holidays App

**Nov 4, 2024** | **1 min read** | **Data fetching**

## Build a Public holidays app

Build a React application that shows the national holidays for the current year, for a given country.

### Requirements

The main screen should show:
- A dropdown with a list of countries
- A list of public holidays for the selected country

### API Integration
- Use the [OpenHolidays API](https://openholidaysapi.org/) to retrieve countries and holidays
- Use English (en) for the languageIsoCode
- Default country: The Netherlands

### Technology Stack
- **React Query** for data fetching ([here's why](https://tkdodo.eu/blog/why-you-want-react-query))
- **Paper CSS** for styling
- **Vite + React** for the build system

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

### API Endpoints

- **Countries:** `https://openholidaysapi.org/Countries?languageIsoCode=en`
- **Holidays:** `https://openholidaysapi.org/PublicHolidays?countryIsoCode={COUNTRY_CODE}&languageIsoCode=en&validFrom={YEAR}-01-01&validTo={YEAR}-12-31`

### Project Structure

```
public-holidays-app/
├── src/
│   ├── components/
│   │   ├── CountryDropdown.jsx
│   │   ├── HolidaysList.jsx
│   │   └── LoadingSpinner.jsx
│   ├── hooks/
│   │   ├── useCountries.js
│   │   └── useHolidays.js
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

### Features
- 🌍 Country selection dropdown
- 📅 Holiday list display
- 🔄 Loading states
- ⚡ Fast data fetching with React Query
- 🎨 Clean styling with Paper CSS
- 🇳🇱 Defaults to Netherlands holidays
