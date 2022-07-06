import React, { useState } from 'react'
import './App.css';
import UseState from './UseState'
import UseReducer from './UseReducer'
import UseEffect from './UseEffect'
import UseContext from './UseContext'

function App() {
  const [show, setShow] = useState(true)
  const [counter, setCounter] = useState(0)
  return (
    <div>
      <UseState/>
      <UseReducer/>
      <button onClick={() => setShow(!show)}>show</button>
      <button onClick={() => setCounter(counter+1)}>+</button>
      { show && <UseEffect counter={counter} /> }
      <UseContext/>
    </div>
  );
}

export default App;
