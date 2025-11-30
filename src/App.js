import React, { useMemo, useState, useCallback } from 'react'
import useSessions from './hooks/useSessions'
import useDebounce from './hooks/useDebounce'
import Header from './components/Header'
import Controls from './components/Controls'
import SessionsList from './components/SessionsList'
import './App.css'

export default function App() {
  const { 
    sessions, 
    loading, 
    error, 
    toggleComplete, 
    retry: retryFetch,
    simulateError 
  } = useSessions()
  
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [sortAsc, setSortAsc] = useState(false)

  // Filter and search functionality
  const filteredSessions = useMemo(() => {
    const searchTerm = debouncedQuery.trim().toLowerCase()
    if (!searchTerm) return sessions

    return sessions.filter(session => {
      // Search in title (case-insensitive)
      if (session.title?.toLowerCase().includes(searchTerm)) return true
      
      // Search in difficulty (case-insensitive)
      if (session.difficulty?.toLowerCase().includes(searchTerm)) return true
      
      // Search in tags (case-insensitive)
      if (Array.isArray(session.tags) && 
          session.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
        return true
      }
      
      return false
    })
  }, [sessions, debouncedQuery])

  // Handle retry after error
  const handleRetry = useCallback(() => {
    setQuery('')
    retryFetch()
  }, [retryFetch])

  // Handle error simulation
  const handleSimulateError = useCallback(() => {
    simulateError()
  }, [simulateError])

  return (
    <div className="app" role="application">
      <Header />
      
      <main className="main-content">
        <Controls
          query={query}
          onQueryChange={setQuery}
          sortAsc={sortAsc}
          onSortChange={setSortAsc}
          searchInputId="sessions-search"
        />
        
        <SessionsList
          sessions={filteredSessions}
          loading={loading}
          error={error}
          sortAsc={sortAsc}
          onToggleComplete={toggleComplete}
          onRetry={handleRetry}
          onSimulateError={handleSimulateError}
          searchQuery={debouncedQuery}
        />
      </main>
      
      <footer className="app-footer">
        <p>Learning Sessions Browser &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
