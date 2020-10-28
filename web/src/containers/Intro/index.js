import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import parse from 'html-react-parser'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    introSpace: {
        minHeight: '600px',
        margin: theme.spacing(4),
        padding: theme.spacing(2),
        textAlign: 'left'
    },
    introductionTitle: {
        marginBottom: theme.spacing(6),
    },
    buttonArea: {
        marginTop: theme.spacing(6)
    }
}))

const Intro = observer((props) => {
    const classes = useStyles()
    const { quizStore } = useAppContext()

    useEffect(() => {
        quizStore.setQuizCode(props.match.params.quizCode)
    }, [quizStore, props.match.params.q])

    const handleBeginQuizClick = (event) => {
        event.preventDefault()

        quizStore.startQuiz()
    }

    const handleEmailChange = (event) => {
        quizStore.userEmail = event.target.value
    }

    const handleRegisterEmailClick = (event) => {
        event.preventDefault()

        if (quizStore.quizCode) {
            quizStore.fetchQuizSession()
            try {
            } catch (e) {
            }
        }
    }
    /** 
     * 
     * rewrite calls to use quizSessionId instead of mailLink
     * 
    */
    return (
        <Container>
            <Paper elevation={2} className={classes.introSpace} >
                <Typography variant="h4" color="inherit" className={classes.introductionTitle}>
                    {quizStore.name}
                </Typography>

                {parse(quizStore.introText)}

                {!quizStore.loaded && 
                <Grid container spacing={3} className={classes.buttonArea}>
                    <Grid item md={12}>
                        <form className={classes.root} >
                            <p>Please enter your email:</p>
                            <TextField label="Email" type="email" value={quizStore.userEmail} onChange={handleEmailChange} name="email" />
                        </form>
                    </Grid>
                    <Grid item md={12}>
                        <Button onClick={handleRegisterEmailClick} type="submit" variant="contained" color="primary" className={classes.button}>
                            Register Email
                        </Button>
                    </Grid>
                </Grid>
                }

                {quizStore.loaded &&     
                <Grid container spacing={3} className={classes.buttonArea}>
                    <Grid item md={12}>
                        <Button onClick={handleBeginQuizClick} type="submit" variant="contained" color="primary" className={classes.button}>
                            Begin
                        </Button>                    
                    </Grid>
                </Grid>
                }

                {quizStore.loadError &&
                    <p>Invalid link!</p>
                }
            </Paper>
        </Container>
    )
})

export default Intro
