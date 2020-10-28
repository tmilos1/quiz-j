import React, { useEffect } from 'react';

import { Admin, Resource, ShowGuesser, ListGuesser, EditGuesser } from 'react-admin'
import dataProvider from './dataProvider'

import { StudentList, StudentCreate, StudentEdit } from './components/Student'
import { InstructorList, InstructorShow, InstructorCreate, InstructorEdit } from './components/Instructor'
import { QuizList, QuizShow, QuizCreate, QuizEdit } from './components/Quiz'
import { QuestionList, QuestionCreate, QuestionEdit } from './components/Question'
import { QuizSessionList, QuizSessionShow, QuizSessionCreate, QuizSessionEdit } from './components/QuizSession'

import { createMuiTheme } from '@material-ui/core/styles'

// import history from 'history'
// // import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from 'history'


const basename = process.env.REACT_APP_SUBDOMAIN ? process.env.REACT_APP_SUBDOMAIN : "/"
const history = createBrowserHistory({ basename })

/*
#000000 black
#1a1a1a dark grey
#262626 lighter dark grey
#e90029 red
*/

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
      main: "#000000", // black
    },
    secondary: {
      main: "#262626", // lighter dark grey
    },
    error: {
      main: "#e90029", // red
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  }
})


const App = () => {
  useEffect(() => {
    const instructorId = new URLSearchParams(history.location.search).get("instructorId")
    if (instructorId) {
      // to manually force instructorId: http://localhost:3000/quizzes?instructorId=5f0705ce3969e3ef6ec83462
      localStorage.setItem('instructorId', instructorId)
    }
  }, [])
  
  return (
    <Admin theme={theme} dataProvider={dataProvider} history={history}>
      <Resource name="quizzes" list={QuizList} show={QuizShow} create={QuizCreate} edit={QuizEdit} />
      <Resource name="quizSessions" show={QuizSessionShow} />
      <Resource name="questions" create={QuestionCreate} edit={QuestionEdit} />
      <Resource name="students" />
      <Resource name="instructors" />
      <Resource name="teachingModules" />
    </Admin>
  )
}

// const App = () => (
//   <Admin theme={theme} dataProvider={dataProvider}>
//     <Resource name="students" list={StudentList} create={StudentCreate} edit={StudentEdit} />
//     <Resource name="instructors" list={InstructorList} show={InstructorShow} create={InstructorCreate} edit={InstructorEdit} />
//     <Resource name="quizzes" list={QuizList} show={QuizShow} create={QuizCreate} edit={QuizEdit} />
//     <Resource name="quizSessions" list={QuizSessionList} show={QuizSessionShow} />
//     <Resource name="teachingModules" />
//   </Admin>
// )

export default App
