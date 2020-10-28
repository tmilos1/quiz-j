import React from 'react'
import Countdown from 'react-countdown'
import { useAppContext } from '../../stores/AppContext'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    timerBox: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
}))

const CountdownTimer = () => {
    const classes = useStyles()
    const { quizStore } = useAppContext() 

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            quizStore.timeoutQuiz()
            return <div />
        } else {
            return <span>{minutes}:{seconds}</span>;
        }
    }


    return (
        <div className={classes.timerBox}>
            <Countdown
                date={quizStore.timer}
                renderer={renderer}
            />
        </div>
    )
}

export default CountdownTimer
