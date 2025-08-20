# Interview Practice Projects

A monorepo containing multiple interview practice projects built with React and Vite. All projects share the same dependencies from a single `package.json` file for easier management.

## 🚀 Quick Start

```bash
# Install all dependencies once
npm install

# List available projects
npm run list-projects

# Run a specific project
npm run dev:holidays        # Public Holidays App
npm run dev:basic-app       # Basic Vite React App
```

## 📁 Project Structure

```
interview-practice/
├── package.json           # Shared dependencies for all projects
├── vite.config.js        # Config for basic React app
├── src/                  # Basic React app source
├── projects/             # Individual practice projects
│   └── public-holidays/  # Public Holidays project
│       ├── src/
│       ├── index.html
│       ├── vite.config.js
│       └── README.md
└── README.md            # This file
```

## 🎯 Available Projects

### 1. Public Holidays App (`npm run dev:holidays`)
- **Port:** http://localhost:3001
- **Description:** Shows national holidays for different countries
- **Features:** Country dropdown, holiday listing, React Query, Paper CSS
- **API:** OpenHolidays API integration

### 2. Basic React App (`npm run dev:basic-app`)
- **Port:** http://localhost:3000  
- **Description:** Simple Vite + React starter template
- **Features:** Counter component, modern CSS

## 📦 Shared Dependencies

All projects use these shared dependencies:
- **React 18.2** - UI framework
- **Vite 5.0** - Build tool and dev server
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **ESLint** - Code linting

## 🔧 Available Scripts

### Development
- `npm run dev` - Run default project (basic app)
- `npm run dev:basic-app` - Run basic React app on port 3000
- `npm run dev:holidays` - Run public holidays app on port 3001

### Build
- `npm run build` - Build default project
- `npm run build:basic-app` - Build basic React app
- `npm run build:holidays` - Build public holidays app

### Preview
- `npm run preview:basic-app` - Preview built basic app
- `npm run preview:holidays` - Preview built holidays app

### Utilities
- `npm run lint` - Lint all projects
- `npm run clean` - Clean build artifacts and cache
- `npm run list-projects` - Show available projects

## ✨ Benefits of This Structure

1. **Single Dependency Management** - One `package.json` for all projects
2. **Consistent Versions** - All projects use the same library versions
3. **Easy Setup** - One `npm install` for everything
4. **Reduced Disk Space** - Shared `node_modules`
5. **Simplified Maintenance** - Update dependencies in one place

## 🎨 Adding New Projects

To add a new interview practice project:

1. Create a new folder in `projects/`
2. Add the project files (src/, index.html, vite.config.js)
3. Update root `package.json` with new scripts:
   ```json
   "dev:project-name": "vite --config projects/project-name/vite.config.js"
   ```
4. Configure vite.config.js with appropriate ports and paths

## 📝 Example Vite Config for New Project

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'projects/your-project-name',
  build: {
    outDir: '../../dist/your-project-name'
  },
  server: {
    port: 3002, // Use next available port
    open: true
  }
})
```

## 🏃‍♂️ Getting Started with Development

1. **Clone and setup:**
   ```bash
   git clone <repo>
   cd interview-practice
   npm install
   ```

2. **Start developing:**
   ```bash
   npm run dev:holidays  # or any other project
   ```

3. **Add more projects** as needed following the structure above

Happy coding! 🚀
