import React, { useState } from 'react'

export const Conter = () => {
const [counter, setCounter] = useState(0);

  function increment(){
    setCounter(counter + 1);
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button onClick={increment}>Increment + 1</button>
    </div>
  )
}
