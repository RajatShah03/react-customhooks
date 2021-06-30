import { useEffect, useReducer, useRef } from 'react'

const useAsyncReducer = (reducer, initialState, init) => {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  
  const asyncFunc = useRef({ callback: () => {} })

  useEffect(() => {
    asyncFunc.current.callback(state[asyncFunc.current.key])
  }, [state])

  const asyncDispatch = (action, callback, key=null) => {
    asyncFunc.current.callback = callback
    asyncFunc.current.key = key
    dispatch(action)
  }

  return [state, asyncDispatch]
}

export default useAsyncReducer
