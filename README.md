# Learning Sessions Browser

A responsive web application for browsing and managing learning sessions with search, sort, and completion tracking.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Controls.jsx     # Search and sort controls
│   ├── Header.jsx       # Application header
│   ├── IndividualCard.jsx # Session card component
│   └── SessionsList.jsx # List of session cards
├── hooks/               # Custom React hooks
│   ├── useDebounce.jsx  # Debounce hook for search
│   └── useSessions.jsx  # Data fetching and state management
├── utils/               # Utility functions
│   ├── highlightMatch.js # Text highlighting for search
│   └── stableSort.js    # Stable sorting implementation
├── data/
│   └── sessions.json    # Session data
├── App.js               # Main application component
├── App.css              # Global styles
├── index.js             # Application entry point
└── theme.js             # Material-UI theme configuration
```

## File Descriptions

### Components
- **Controls.jsx** - Handles search input and sort toggle
- **Header.jsx** - Displays the application header with title
- **IndividualCard.jsx** - Renders a single session card with completion toggle
- **SessionsList.jsx** - Manages the list of session cards and loading/error states

### Hooks
- **useDebounce.jsx** - Custom hook for debouncing search input
- **useSessions.jsx** - Manages session data, loading states, and completion toggling

### Utils
- **highlightMatch.js** - Utility for highlighting search matches in text
- **stableSort.js** - Stable sorting implementation that maintains item order for equal values

### Data
- **sessions.json** - Contains the list of learning sessions with their details




## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd admin-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production


```
