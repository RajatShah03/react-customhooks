import { useCallback, useEffect, useRef, useState } from 'react'

const useDebounceState = (initialState, callback, timeout=1000) => {
  const [state, setState] = useState(initialState)
  
  const timer = useRef(null)

  const debounce = useCallback((value) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      callback(value)
    }, timeout)
  }, [callback, timeout])

  useEffect(() => {
    debounce(state)
  }, [state, debounce])  

  return [state, setState]
}

export default useDebounceState
