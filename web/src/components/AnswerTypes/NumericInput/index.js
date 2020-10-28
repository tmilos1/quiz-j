import React from 'react'
import TextField from '@material-ui/core/TextField'

import { observer } from "mobx-react"
import { useAppContext } from '../../../stores/AppContext'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    form: {
        textAlign: 'left',
        padding: theme.spacing(1),
    },
    field: {
        display: "flex",
        justifyContent: 'flex-start',
        width: '15ch'
    }
}))

const NumericInput = observer((props) => {
    const classes = useStyles()
    const { quizStore, questionsStore, answerStore } = useAppContext()

    const handleInputChange = (event) => {
        answerStore.answers[quizStore.currentQuestionIndex].value = event.target.value
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }    

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    className={classes.field}
                    type="number"
                    label={questionsStore.questions[quizStore.currentQuestionIndex].label}
                    value={answerStore.answers[quizStore.currentQuestionIndex].value}
                    onChange={handleInputChange}
                />
            </form>
        </>
    )
})

export default NumericInput
