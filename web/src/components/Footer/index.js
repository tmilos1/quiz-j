import React from 'react'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(2),
    },
}))

const Footer = () => {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
                @ Quiz
            </Typography>
        </footer>
    )
}

export default Footer
