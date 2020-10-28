import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { useAppContext } from '../../stores/AppContext'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import parse from 'html-react-parser'

const useStyles = makeStyles((theme) => ({
    finalSpace: {
        minHeight: '600px',
        margin: theme.spacing(4),
        padding: theme.spacing(2),
        textAlign: 'left',
    },   
    introductionTitle: {
        marginBottom: theme.spacing(6),
    },    
    buttonArea: {
        marginTop: theme.spacing(6)
    }
}))

const Timeout = () => {
    const classes = useStyles()
    const { quizStore } = useAppContext()    

    return (
        <Container>
            <Paper elevation={2} className={classes.finalSpace} >
                <Typography variant="h4" color="inherit" className={classes.introductionTitle}>
                    Quiz Timeout !
                </Typography>

                {quizStore.timeoutText &&
                    parse(quizStore.timeoutText)
                }
            </Paper>
        </Container>
    )
}

export default Timeout
