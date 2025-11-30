import React, { useRef, useEffect } from 'react'


const DEBOUNCE_DELAY = 300

export default function Controls({ 
  query, 
  onQueryChange, 
  sortAsc, 
  onSortChange,
  searchInputId = 'search-sessions'
}) {
  const searchInputRef = useRef(null)
  
  // Focus the search input on mount for better keyboard navigation
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const handleSearchChange = (e) => {
    onQueryChange(e.target.value)
  }


  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && searchInputRef.current) {
      searchInputRef.current.blur()
    }
  }

  return (
    <div 
      className="controls" 
      role="search" 
      aria-label="Sessions search and sort controls"
    >
      <div className="search-container">
        <label 
          htmlFor={searchInputId}
          className="visually-hidden"
        >
          Search sessions
        </label>
        <input
          id={searchInputId}
          ref={searchInputRef}
          type="search"
          className="search-input"
          placeholder="Search by title, difficulty, or tags..."
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          aria-controls="sessions-list"
          aria-describedby="search-help"
        />
        <div id="search-help" className="search-help">
          {query ? (
            <span className="search-results-count">
              {query ? 'Searching...' : ''}
            </span>
          ) : (
            <span className="search-hint">
              Type to search by title, difficulty, or tags
            </span>
          )}
        </div>
      </div>

      <div className="sort-container">
        <label className="sort-label">
          <span className="sort-label-text">Sort by:</span>
          <select 
            className="sort-select"
            value={sortAsc ? 'asc' : 'desc'}
            onChange={(e) => onSortChange(e.target.value === 'asc')}
            aria-label="Sort order"
          >
            <option value="desc">Most Popular</option>
            <option value="asc">Least Popular</option>
          </select>
        </label>
      </div>
    </div>
  )
}


