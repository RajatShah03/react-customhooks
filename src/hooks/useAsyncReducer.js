import { useEffect, useReducer, useRef } from 'react'

const useAsyncReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const asyncFunc = useRef(() => {})

  useEffect(() => {
    asyncFunc.current(state)
  }, [state])

  const dispatchAsync = (newState, callback) => {
    asyncFunc.current = callback
    dispatch(newState)
  }

  return [state, dispatchAsync]
}

export default useAsyncReducer
