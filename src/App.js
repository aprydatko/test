import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './screens/Header'
import Routers from './Routers'

const App = () => {
  return (
    <Router>
      <Header />
      <Routers />
    </Router>
  )
}

export default App
