import React from 'react'
import useAsyncReducer from '../hooks/useAsyncReducer'
import useAsyncState from '../hooks/useAsyncState'
import useDebounceState from '../hooks/useDebounceState'
import useThrottleState from '../hooks/useThrottleState'

const insertValueInDOM = id => value => {
  
  document.getElementById(id).innerHTML = value.toString()
}

const init = initialCount => {
  return { count: initialCount }
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'INC':
      return { count: state.count + 1 }
    case 'DEC':
      return { count: state.count - 1 }
    case 'RESET':
      return init(action.payload)
    default:
      throw new Error()
  }
}

const Demo = () => {
  const initialCount = 0
  const [asyncCounter, setAsyncCounter] = useAsyncState(0)
  const [textDe, setTextDe] = useDebounceState('', insertValueInDOM('text-de'), 2000)
  const [textTh, setTextTh] = useThrottleState('', insertValueInDOM('text-th'), 2000)
  const [complexState, dispatch] = useAsyncReducer(reducer, initialCount, init)

  const handleCountChange = type => () => {
    setAsyncCounter(
      type === 'INC' ? asyncCounter + 1 : asyncCounter - 1,
      insertValueInDOM('counter')
    )
  }

  const handleDebouncedTextChange = (e) => {
    setTextDe(e.target.value)
  }

  const handleThrottleTextChange = (e) => {
    setTextTh(e.target.value)
  }

  const handleComplexCountChange = type => (payload=null) => {
    dispatch(
      {
        type,
        payload
      },
      insertValueInDOM('counter-cmp'),
      'count'
    )
  }

  return (
    <div>
      <div>Count: <span><strong id='counter'>0</strong></span></div>
      <button onClick={handleCountChange('INC')}>Increment +</button>
      <button onClick={handleCountChange('DEC')}>Decrement -</button>
      <hr />
      <div>Delay: 2sec</div>
      <div>Debounced Text: <span><strong id='text-de'></strong></span></div>
      <input value={textDe} onChange={handleDebouncedTextChange} />
      <hr />
      <div>Delay: 2sec</div>
      <div>Throttle Text: <span><strong id='text-th'></strong></span></div>
      <input value={textTh} onChange={handleThrottleTextChange} />
      <hr />
      <div>Complex Count: <span>Async: <strong id='counter-cmp'>0</strong> State: {complexState.count}</span></div>
      <button onClick={handleComplexCountChange('INC')}>Increment +</button>
      <button onClick={handleComplexCountChange('DEC')}>Decrement -</button>
      <button onClick={() => handleComplexCountChange('RESET')(initialCount)}>Reset</button>
    </div>
  )
}

export default Demo
