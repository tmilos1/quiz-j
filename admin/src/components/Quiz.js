import React from 'react'

import {
    List, Datagrid, TextField, EmailField, Create, Edit, SimpleForm, SimpleFormIterator,
    ArrayInput, TextInput, NumberInput, DateInput,
    ReferenceInput, SelectInput,
    Tab, TabbedForm, ReferenceManyField, FormTab, FormWithRedirect, TabbedShowLayout,
    Show, SimpleShowLayout, ArrayField, ReferenceField, NumberField, DateField, UrlField,
    ReferenceArrayField, SingleFieldList, ChipField,
    required, useRefresh, useNotify, useRedirect,
    Toolbar, SaveButton
} from 'react-admin'

import { useMutation, Button } from 'react-admin'

import { TopToolbar, ShowButton, EditButton } from 'react-admin'

import RichTextInput from 'ra-input-rich-text'
import striptags from 'striptags'

import { QuestionList, QuestionCreate, QuestionEdit } from './Question'
import AddQuestionButton from './AddQuestionButton'
import AnswerTypeField from './AnswerTypeField'

export const QuizList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="name" />
            <RawContentTableField source="introText" />
            <DateField source="timeCreated" />
        </Datagrid>
    </List>
)

export const QuizShow = props => {
    const redirect = useRedirect()

    const questionEditClick = (id) => {   
        redirect(`/questions/${id}?quizId=${props.id}`)
    }

    const quizSessionShowClick = (id) => {
        redirect(`/quizSessions/${id}/show?quizId=${props.id}`)
    }

    return (
        <Show {...props} >
            <TabbedShowLayout>
                <Tab label="Quiz Info">
                    <TextField source="name" />
                    <RawContentTextField source="introText" />
                    <UrlField source="quizLink" />
                    <TextField source="allowedDuration" label="Duration (min)" />
                </Tab>
                <Tab label="Questions" path="questions">
                    <ReferenceManyField reference="questions" target="quizId" addLabel={false}>
                        <Datagrid rowClick={questionEditClick} >
                            <TextField source="content" label="Question" />
                            <AnswerTypeField source="answerType" />
                        </Datagrid>
                    </ReferenceManyField>
                    <AddQuestionButton />
                </Tab>
                <Tab label="Answers" path="answers">
                    <ReferenceManyField reference="quizSessions" target="quizId" addLabel={false}>
                        <Datagrid rowClick={quizSessionShowClick} >
                        <ReferenceField source="studentId" reference="students" link={false}><TextField source="email" /></ReferenceField>
                        <TextField source="timeStarted" />
                        <TextField source="timeFinished" />
                        <NumberField source="allowedDuration" />
                        <TextField source="sessionStatus" />
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>                
            </TabbedShowLayout>
        </Show>
    )
}

const RawContentTableField = ({record = {}}) => <span>{striptags(record.introText)}</span>
const RawContentTextField = ({record = {}}) => <p>{striptags(record.introText)}</p>

export const QuizCreate = props => {
    const redirect = useRedirect()

    const onSuccess = ({ data }) => {
        console.log(data)
        redirect(`/questions/create?quizId=${data.id}`)
    }

    return (
        <Create {...props} onSuccess={onSuccess} >
            <SimpleForm>
                <TextInput source="name" fullWidth />
                <RichTextInput source="introText" />
            </SimpleForm>
        </Create>
    )
}

export const QuizEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" fullWidth />
            <RichTextInput source="introText" />
            <TextInput source="allowedDuration" label="Duration" />
        </SimpleForm>
    </Edit>
)
