import React from 'react'
import { useLocation } from 'react-router'

import { FormDataConsumer } from 'react-admin'

import {
    List, Datagrid, TextField, EmailField, Create, Edit, SimpleForm, SimpleFormIterator,
    ArrayInput, TextInput, NumberInput, DeleteButton,
    ReferenceInput, SelectInput, SaveButton, Toolbar,
    Show, SimpleShowLayout, ArrayField, ReferenceField,
    ReferenceArrayField, SingleFieldList, ChipField,
    required, useRedirect, useRefresh
} from 'react-admin'

import { makeStyles } from '@material-ui/core/styles'

export const QuestionList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="content" label="Question" />
            <TextField source="answerType" />
        </Datagrid>
    </List>
)

export const QuestionCreate = props => {
    const urlParams = new URLSearchParams(props.location.search)
    const quizId = urlParams.get('quizId')

    const redirect = quizId ? `/quizzes/${quizId}/show` : false

    return (
        <Create {...props} submitOnEnter={false}>
            <SimpleForm toolbar={<QuestionCreateToolbar quizId={quizId} submitOnEnter={false} />}
                redirect={redirect}
            >
                <SelectInput source="answerType" label="Question Type" choices={[
                    { id: 'RADIO_SELECT', name: 'Multiple choice' },
                    { id: 'YES_NO', name: 'True/False' },
                    { id: 'SHORT_TEXT', name: 'Short Text' },
                    { id: 'NUMERIC_INPUT', name: 'Numeric Input' },
                ]} />
                <TextInput source="content" label="Question" fullWidth />

                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.answerType === 'RADIO_SELECT' &&
                        <ArrayInput source="answerChoices" label="Answer Choices">
                            <SimpleFormIterator>
                                <TextInput source="label" label="Choice" fullWidth />
                            </SimpleFormIterator>
                        </ArrayInput>
                    }
                </FormDataConsumer>

                <TextInput source="correctAnswer" style={{width: "50%"}} helperText="For multiple choice questions, please enter the correct choice number, eg. 1 or 2..." />
            </SimpleForm>
        </Create>
    )
}

const QuestionCreateToolbar = props => {
    const redirect = useRedirect()
    const refresh = useRefresh()

    const onAddAnother = () => {
        redirect(`/questions/create?quizId=${props.quizId}`)
        refresh()
    }

    return (
        <Toolbar {...props} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SaveButton
                label="Add Another Question"
                transform={data => ({ ...data, quizId: props.quizId })}
                onSuccess={onAddAnother}
            />

            <SaveButton
                label="Save and Finish"
                transform={data => ({ ...data, quizId: props.quizId })}
            />
        </Toolbar>
    )
}

export const QuestionEdit = props =>  {
     const urlParams = new URLSearchParams(props.location.search)
    const quizId = urlParams.get('quizId')

    const redirect = quizId ? `/quizzes/${quizId}/show/questions` : false

    return (
        <Edit {...props} undoable={false} submitOnEnter={false} >
            <SimpleForm redirect={redirect} toolbar={<QuestionsToolbar redirect={redirect} />} >
                <SelectInput source="answerType" label="Question Type" choices={[
                    { id: 'RADIO_SELECT', name: 'Multiple choice' },
                    { id: 'YES_NO', name: 'True/False' },
                    { id: 'SHORT_TEXT', name: 'Short Text' },
                    { id: 'NUMERIC_INPUT', name: 'Numeric Input' },
                ]} />
                <TextInput source="content" label="Question" fullWidth />

                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.answerType === 'RADIO_SELECT' &&
                        <ArrayInput source="answerChoices" label="Answer Choices">
                            <SimpleFormIterator>
                                <TextInput source="label" label="Choice" fullWidth />
                            </SimpleFormIterator>
                        </ArrayInput>
                    }
                </FormDataConsumer>

                <TextInput source="correctAnswer" style={{width: "50%"}} helperText="For multiple choice questions, please enter the correct choice number, eg. 1 or 2..." />
            </SimpleForm>
        </Edit>
    )
}

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
})

const QuestionsToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton />
        <DeleteButton redirect={props.redirect} />
    </Toolbar>
)