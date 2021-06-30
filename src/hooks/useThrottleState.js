import { useCallback, useEffect, useRef, useState } from 'react'

const useThrottleState = (initialState, callback, timeout=1000) => {
  const [state, setState] = useState(initialState)
  
  const timer = useRef(null)

  const throttle = useCallback((value) => {
    if (timer.current) return

    timer.current = setTimeout(() => {
      callback(value)
      timer.current = null
    }, timeout)
  }, [callback, timeout])

  useEffect(() => {
    throttle(state)
  }, [state, throttle])  

  return [state, setState]
}

export default useThrottleState
