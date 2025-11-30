import { useEffect, useState, useCallback, useRef } from 'react'
import sessionsData from '../data/sessions.json'

const STORAGE_KEY = 'sessions_completed'

// Simulate API call with error handling
export default function useSessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const shouldErrorRef = useRef(false)

  const fetchSessions = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (shouldErrorRef.current) {
        shouldErrorRef.current = false
        throw new Error('Simulated error: Failed to load sessions')
      }

      // Process session data
      const withIndex = sessionsData.map((s, i) => ({
        ...s,
        originalIndex: i,
        mins: s.mins ? parseInt(s.mins, 10) : 0, // Coerce mins to number here
        difficulty: s.difficulty || 'N/A' // Ensure difficulty has a fallback
      }))

      // Apply persisted completed state
      const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      const merged = withIndex.map(s => ({
        ...s,
        completed: s.id in persisted ? persisted[s.id] : s.completed
      }))

      setSessions(merged)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  // Persist completed flags
  useEffect(() => {
    if (sessions.length === 0) return
    
    const map = {}
    for (const s of sessions) {
      map[s.id] = s.completed
    }
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
    } catch (e) {
      console.warn('Failed to persist session state:', e)
    }
  }, [sessions])

  const toggleComplete = useCallback((id) => {
    setSessions(prev => 
      prev.map(s => 
        s.id === id ? { ...s, completed: !s.completed } : s
      )
    )
  }, [])

  const simulateError = useCallback(() => {
    shouldErrorRef.current = true
    fetchSessions()
  }, [fetchSessions])

  return { 
    sessions, 
    loading, 
    error, 
    toggleComplete, 
    retry: fetchSessions,
    simulateError 
  }
}
