import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import { useAppContext } from '../../../stores/AppContext'

import { observer } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    form: {
        textAlign: 'left',
        padding: theme.spacing(1),
    },
    answerLabel: {
        marginBottom: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(3),
    },
}))

const YesNo = observer((props) => {
    const classes = useStyles()
    const { quizStore, questionsStore, answerStore } = useAppContext()

    const handleRadioChange = (event) => {
        answerStore.answers[quizStore.currentQuestionIndex].value = event.target.value
    }
    return (
        <form className={classes.form}>
            <FormControl component="fieldset" className={classes.formControl}>

                <FormLabel component="legend" className={classes.answerLabel}>Please select the correct answer:</FormLabel>

                <RadioGroup aria-label="quiz"
                    name="quiz"
                    value={answerStore.answers[quizStore.currentQuestionIndex].value}
                    onChange={handleRadioChange}
                >

                    <FormControlLabel
                        key='yes'
                        value='yes'
                        control={<Radio />}
                        label='Yes'
                    />

                    <FormControlLabel
                        key='no'
                        value='no'
                        control={<Radio />}
                        label='No'
                    />

                </RadioGroup>

            </FormControl>
        </form>
    )
})


export default YesNo
