import React from 'react'
import { Flip, ToastContainer } from 'react-toastify'
import Routing from './routing/Routing'

const App = () => {
  return (
    <>
    <ToastContainer
    limit={4}
    transition={Flip}/>
      <Routing/>
    </>
  )
}

export default App