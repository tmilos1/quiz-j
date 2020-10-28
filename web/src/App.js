import React from 'react';
import './App.css';
import { observer } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { quizStatus } from './constants'
import Header from './components/Header'
import Intro from './containers/Intro'
import Quiz from './containers/Quiz'
import Final from './containers/Final'
import Timeout from './containers/Timeout'
import Footer from './components/Footer'

import { useAppContext } from './stores/AppContext'

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: "#000000",
  },
}))

const App = observer(() => {
  const { quizStore } = useAppContext()
  const classes = useStyles()

  const quizComponent = () => {
    switch (quizStore.status) {
      case quizStatus.RUNNING:
        return Quiz

      case quizStatus.FINISHED:
        return Final

      case quizStatus.TIMEOUT:
        return Timeout

      default:
        return Intro
    }
  }

  return (
    <div className={App, classes.app}>
      <Router basename={process.env.REACT_APP_SUBDOMAIN ? process.env.REACT_APP_SUBDOMAIN : "/"}>
        <Header />

        <Switch>

          {/* for use from email link: eg. http://localhost:3000/emailLink/44325435345 */}
          {/* <Route path="/emailLink/:mailSlug" component={quizComponent()} /> */}

          {/* for use from email link: eg. http://localhost:3001/q/21413657222 */}
          <Route path="/q/:quizCode" component={quizComponent()} />
          <Route path="/" component={quizComponent()} />

        </Switch>

        <Footer />
      </Router>
    </div>
  )
})

export default App
