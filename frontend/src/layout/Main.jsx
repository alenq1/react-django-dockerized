import React from 'react'
import Header from '../layout/Header'
import Home from '../pages/Home'
import Footer from '../layout/Footer'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'


const hist = createBrowserHistory()


const Main = () => {




  return (
    <div>
      <Router history={hist}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}


export default Main
