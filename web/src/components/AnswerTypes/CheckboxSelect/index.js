import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
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

const CheckboxSelect = observer((props) => {
    const classes = useStyles()
    const { quizStore, questionsStore, answerStore } = useAppContext()

    const handleCheckboxCheck = (event) => {
        if (event.target.checked) {
            answerStore.answers[quizStore.currentQuestionIndex].values.add(event.target.name)
        } else {
            answerStore.answers[quizStore.currentQuestionIndex].values.delete(event.target.name)
        }
    }

    return (
        <form className={classes.form}>
            <FormControl component="fieldset" className={classes.formControl}>

                <FormLabel component="legend" className={classes.answerLabel}>Please check the correct answers:</FormLabel>
                    {questionsStore.questions[quizStore.currentQuestionIndex].answers.map(answer => {
                        return <FormControlLabel
                            key={answer.value}
                            control={<Checkbox 
                                checked={answerStore.answers[quizStore.currentQuestionIndex].values.has(answer.value)}
                                onChange={handleCheckboxCheck}
                                name={answer.value}
                            />}
                            label={answer.label}
                            />
                    })}

            </FormControl>
        </form>
    )
})


export default CheckboxSelect
