import React from 'react'
import {Route, BrowserRouter as Router , Switch} from 'react-router-dom'
import Home from './Home'
import Detail from './Detail'
import Header from './Header'

export default function App() {
  return (
    <Router>
    <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/detail/:id' component={Detail} />
      </Switch>
    </Router>
  )
}
