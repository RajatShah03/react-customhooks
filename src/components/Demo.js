import React from 'react'
import useAsyncState from '../hooks/useAsyncState'
import useDebounceState from '../hooks/useDebounceState'
import useThrottleState from '../hooks/useThrottleState'

const insertValueInDOM = id => value => {
  document.getElementById(id).innerHTML = value.toString()
}

const Demo = () => {
  const [asyncCounter, setAsyncCounter] = useAsyncState(0)
  const [textDe, setTextDe] = useDebounceState('', insertValueInDOM('text-de'), 2000)
  const [textTh, setTextTh] = useThrottleState('', insertValueInDOM('text-th'), 2000)

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
    </div>
  )
}

export default Demo
