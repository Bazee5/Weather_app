import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Weather } from './Components/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Weather/>
    </>
  )
}

export default App
