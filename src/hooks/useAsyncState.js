import { useEffect, useRef, useState } from 'react'

const useAsyncState = (initialState) => {
  const [state, setState] = useState(initialState)
  
  const asyncFunc = useRef(() => {})

  useEffect(() => {
    asyncFunc.current(state)
  }, [state])

  const setStateAsync = (newState, callback) => {
    asyncFunc.current = callback
    setState(newState)
  }

  return [state, setStateAsync]
}

export default useAsyncState
