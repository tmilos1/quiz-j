import React from 'react'

import {
    List, Datagrid, TextField, EmailField, Create, Edit, SimpleForm, SimpleFormIterator,
    ArrayInput, TextInput, NumberInput, DateInput,
    ReferenceInput, SelectInput,
    Show, SimpleShowLayout, ArrayField, ReferenceField, NumberField, DateField,
    ReferenceArrayField, SingleFieldList, ChipField,
    required
} from 'react-admin'

import { Button, useNotify } from 'react-admin'
import AnswerTypeField from './AnswerTypeField'

export const QuizSessionList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <ReferenceField source="quizId" reference="quizzes"><TextField source="name" /></ReferenceField>
            <ReferenceField source="studentId" reference="students"><TextField source="email" /></ReferenceField>
            <TextField source="timeStarted" />
            <TextField source="timeFinished" />
            <NumberField source="allowedDuration" />
            <NumberField source="currentQuestionIndex" />
            <TextField source="sessionStatus" />
        </Datagrid>
    </List>
)

export const QuizSessionShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <ReferenceField source="quizId" reference="quizzes"><TextField source="name" /></ReferenceField>
            <ReferenceField source="studentId" reference="students"><TextField source="email" /></ReferenceField>
            {/* <TextField source="mailSlug" /> */}
            <TextField source="timeStarted" />
            <TextField source="timeFinished" />
            <NumberField source="allowedDuration" />
            {/* <NumberField source="currentQuestionIndex" /> */}
            <ArrayField source="answers" label="Given answers">
                <Datagrid>
                    <AnswerTypeField source="answerType" />
                    <TextField source="content" />
                    <TextField source="isCorrect" />
                    {/* <TextField source="choices" /> */}
                </Datagrid>
            </ArrayField>
            <TextField source="sessionStatus" />
        </SimpleShowLayout>
    </Show>
)

export const QuizSessionCreate = props => (
    <Create {...props} submitOnEnter={false}>
        <SimpleForm>
            <TextField source="publishStatus" />
            <TextInput source="name" fullWidth />
        </SimpleForm>
    </Create>
)

export const QuizSessionEdit = props => (
    <Edit {...props} submitOnEnter={false}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
)
