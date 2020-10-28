import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

import parse from 'html-react-parser'
import ReactPlayer from 'react-player'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    questionText: {
        textAlign: 'left'
    },
    videoPlayerArea: {
        maxWidth: "600px"
    },
    spinner: {
        margin: theme.spacing(5)
    },
    image: {
        width: "100%"
    }
}))

const QuestionArea = (props) => {
    const [videoReady, setVideoReady] = useState(false)
    const classes = useStyles()

    const handleVideoReady = () => {
        setVideoReady(true)
    }

    return (
        <div>
            <Typography variant="h4" color="inherit">
                {props.question.title}
            </Typography>

            <div className={classes.questionText}>
                {parse(props.question.content)}
            </div>

            {
                props.question.video_url &&
                (
                    <div className={classes.videoPlayerArea}>
                        {!videoReady && <CircularProgress className={classes.spinner} />}
                        <ReactPlayer url={props.question.video_url} onReady={handleVideoReady} width='100%' />
                    </div>
                )
            }

            {
                props.question.image_url &&
                (
                    <Paper>
                        <img className={classes.image} src={props.question.image_url} alt="Question" />
                    </Paper>
                )
            }
        </div>
    )
}

export default QuestionArea
