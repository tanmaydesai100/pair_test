import React, { useMemo } from 'react'
import IndividualCard from './IndividualCard'
import stableSort from '../utils/stableSort'

export default function SessionsList({ 
  sessions, 
  loading, 
  error, 
  sortAsc, 
  onToggleComplete,
  onRetry,
  onSimulateError,
  searchQuery = ''
}) {
  const sorted = useMemo(() => {
    // sort by popularity (desc by default), stable with originalIndex
    return stableSort([...sessions], (a, b) => {
      if (a.popularity === b.popularity) return 0
      return sortAsc ? a.popularity - b.popularity : b.popularity - a.popularity
    })
  }, [sessions, sortAsc])

  if (loading) {
    return (
      <div className="status" role="status" aria-live="polite" aria-busy="true">
        <p>Loading sessions…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container" role="alert">
        <p className="error-message">{error}</p>
        <div className="button-group">
          <button 
            className="retry-button" 
            onClick={onRetry}
            aria-label="Retry loading sessions"
          >
            Retry
          </button>
          <button 
            className="error-button" 
            onClick={onSimulateError}
            aria-label="Simulate error"
          >
            Simulate Error
          </button>
        </div>
      </div>
    )
  }

  if (sorted.length === 0) {
    return (
      <div className="empty" role="status" aria-live="polite">
        <p>No sessions found. Try adjusting your search.</p>
      </div>
    )
  }

  return (
    <div className="sessions-container">
      <ul className="sessions-list" role="list" aria-label="Learning sessions">
        {sorted.map((session, index) => (
          <li key={session.id} className="session-item">
            <IndividualCard
              session={session} 
              onToggle={() => onToggleComplete(session.id)}
              searchQuery={searchQuery}
            />
          </li>
        ))}
      </ul>
      
      <div className="controls-footer">
        <button 
          className="error-button" 
          onClick={onSimulateError}
          aria-label="Simulate error"
        >
          Simulate Error
        </button>
      </div>
    </div>
  )
}
