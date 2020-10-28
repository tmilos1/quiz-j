import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import CountdownTimer from '../../components/CountdownTimer'
import PrevNextQuestionButtons from '../../components/PrevNextQuestionButtons'
import FinishButton from '../../components/FinishButton'
import QuestionArea from '../../components/QuestionArea'
import AnswerArea from '../../components/AnswerArea'

const useStyles = makeStyles((theme) => ({
  quizSpace: {
    minHeight: '600px',
    margin: theme.spacing(4),
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  }
}))


const Quiz = observer(() => {
  const classes = useStyles()
  const { quizStore, questionsStore } = useAppContext()
  
  return (
    <Container>
      <Paper elevation={2} className={classes.quizSpace} >
        <div>
          <CountdownTimer />

          <QuestionArea question={questionsStore.questions[quizStore.currentQuestionIndex]} />
          <AnswerArea type={questionsStore.questions[quizStore.currentQuestionIndex].type} />          
        </div>

        <Grid container spacing={3}>
          <Grid item md={6}>
            <PrevNextQuestionButtons />
          </Grid>
          <Grid item md={6}>
            <FinishButton />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
})

export default Quiz
