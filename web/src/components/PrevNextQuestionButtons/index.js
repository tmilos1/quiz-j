import React from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'

import { useAppContext } from '../../stores/AppContext'
import { observer } from "mobx-react"

const useStyles = makeStyles((theme) => ({
    prevNextButtonBox: {
        margin: theme.spacing(5, 0, 3),
        display: "flex",
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}))

const PrevNexQuestionButtons = observer(() => {
    const classes = useStyles()
    const { quizStore } = useAppContext()

    const handleNextQuestionClick = (event) => {
        event.preventDefault()

        quizStore.nextQuestion()
    }

    const handlePrevQuestionClick = (event) => {
        event.preventDefault()

        quizStore.previousQuestion()
    }

    const isDisabledNext = () => {
        return quizStore.isLastQuestion()
    }

    const isDisabledPrevious = () => {
        return quizStore.isFirstQuestion()
    }

    return (
        <>
            <Box component="span" m={1} className={classes.prevNextButtonBox}>

                <Button onClick={handlePrevQuestionClick} disabled={isDisabledPrevious()} type="submit" variant="outlined" className={classes.button}>
                    Previous Question
                </Button>

                <Button onClick={handleNextQuestionClick} disabled={isDisabledNext()} type="submit" variant="contained" color="primary" className={classes.button}>
                    Next Question
                </Button>

            </Box>
        </>
    )
})

export default PrevNexQuestionButtons
