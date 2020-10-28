import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    }
}))

const Header = () => {
    const classes = useStyles()

    return (
        <AppBar className={classes.appTitle} position="relative">
            <Container >
                <Toolbar>
                    <Grid container>

                        <Grid item sm={12} md={3}>
                            <div className={classes.centerAppItems}>
                                <Typography variant="h6" color="inherit">
                                    Quiz
                                </Typography>
                            </div>
                        </Grid>

                    </Grid> {/* container */}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
