import React from 'react'
import { Link } from 'react-router-dom'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import { withStyles } from '@material-ui/core/styles'
import { Button } from 'react-admin'

const styles = {
    button: {
        marginTop: '1em'
    }
}

const AddQuestionButton = ({ classes, record }) => (
    <Button
        className={classes.button}
        variant="raised"
        component={Link}
        to={`/questions/create?quizId=${record.id}`}
        label="Add a question"
        title="Add a question"
    >
        <ContactSupportIcon />
    </Button>
)

export default withStyles(styles)(AddQuestionButton)
