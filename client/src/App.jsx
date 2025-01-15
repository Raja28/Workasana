import { useState } from 'react'

import Login from './pages/Login'
import Footer from './components/common/Footer'
import Header from './components/common/Header'
import { Outlet } from 'react-router-dom'

// import './App.css'

function App() {


  return (
    <>
      {/* <Header /> */}
      <Login />
      {/* <Footer /> */}
    </>
  )
}

export default App
