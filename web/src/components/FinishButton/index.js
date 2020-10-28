import React from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'

import { useAppContext } from '../../stores/AppContext'
import { observer } from "mobx-react"

const useStyles = makeStyles((theme) => ({
    finishButton: {
        margin: theme.spacing(5, 0, 3),
        display: "flex",
        justifyContent: "right",
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}))

const FinishButton = observer(() => {
    const classes = useStyles()
    const { quizStore } = useAppContext()

    const handleFinishClick = (event) => {
        event.preventDefault()

        quizStore.finishQuiz()
    }

    return (
        <>
            { quizStore.displayFinishButton() &&
            <Box component="span" m={1} className={classes.finishButton}>

                <Button onClick={handleFinishClick} type="submit" variant="contained" className={classes.button}>
                    Finish Quiz
                </Button>

            </Box>
            }
        </>
    )
})

export default FinishButton
