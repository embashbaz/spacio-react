/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'


import SpacioApp from './dash/SpacioApp'
import Login from './login/Login'


function App() {

  const [token, setToken] = useState(null) 



  useEffect(() => {
    const loggedInToken = window.localStorage.getItem('token')
    if (loggedInToken) {
      setToken(loggedInToken)
    }
  }, [])

  return (
    
    <Router basename="/">
      <Routes>
      <Route path="/*" element={token ? <SpacioApp /> : <Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
