import React from 'react'

import {
    List, Datagrid, TextField, EmailField, Create, Edit, SimpleForm, SimpleFormIterator,
    ArrayInput, TextInput, NumberInput, DateInput,
    ReferenceInput, SelectInput,
    Show, SimpleShowLayout, ArrayField, ReferenceField, NumberField, DateField,
    ReferenceArrayField, SingleFieldList, ChipField,
    required, useRefresh, useNotify
} from 'react-admin'

import { useMutation, Button } from 'react-admin'

import { TopToolbar, ShowButton, EditButton } from 'react-admin'

import RichTextInput from 'ra-input-rich-text'

export const QuizList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="name" />
            <TextField source="introText" />
            <NumberField source="allowedDuration" />
            <DateField source="timeCreated" />
            <TextField source="publishStatus" />
        </Datagrid>
    </List>
)

export const QuizShow = props => (
    <Show {...props} actions={<QuizActions />}>
        <SimpleShowLayout>
            <TextField source="publishStatus" />
            <TextField source="name" />
            <TextField source="introText" />
            <TextField source="finalText" />
            <TextField source="timeoutText" />
            <NumberField source="allowedDuration" />
            <DateField source="timeCreated" />
            <ArrayField source="questions">
                <Datagrid>
                    <TextField source="title" />
                    <TextField source="content" />
                    <TextField source="answerType" />
                    <TextField source="imageUrl" />
                    <TextField source="videoUrl" />
                    <ArrayField source="answerChoices">
                        <Datagrid>
                            <TextField source="label" label="Label" />
                            <TextField source="value" label="Value" />
                        </Datagrid>
                    </ArrayField>
                </Datagrid>
            </ArrayField>

        </SimpleShowLayout>
    </Show>
)

const QuizActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />

        <PublishButton record={data} />
    </TopToolbar>
)

const PublishButton = ({ record }) => {
    const refresh = useRefresh()
    const notify = useNotify()

    if (record == null) {
        record = { id: 0 }
    }

    const [publishActionHandler, { loading }] = useMutation(
        {
            type: 'patch',
            resource: 'quizzes',
            payload: { id: record.id, field: 'publishStatus', data: { action: 'PUBLISHED' } }
        },
        {
            onSuccess: () => {
                refresh()
            },
            onFailure: (error) => notify(`Error publishing Quiz: ${error.message}`, 'warning'),
        }
    )

    return <Button label="Publish" onClick={publishActionHandler} disabled={loading} />
}

export const QuizCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="publishStatus" />
            <TextInput source="name" fullWidth />

            <ReferenceInput label="Teaching Module" source="teachingModuleId" reference="teachingModules">
                <SelectInput source="name" label="Teachin Module" />
            </ReferenceInput>

            <RichTextInput source="introText" />
            <RichTextInput source="finalText" />
            <RichTextInput source="timeoutText" />
            <NumberInput source="allowedDuration" defaultValue={30} />
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <TextInput source="title" label="Title" fullWidth />
                    <TextInput source="content" label="Text" required multiline fullWidth />
                    <SelectInput source="answerType" label="Question Type" choices={[
                        { id: 'RADIO_SELECT', name: 'Radio Select' },
                        { id: 'SHORT_TEXT', name: 'Short Text' },
                        { id: 'NUMERIC_INPUT', name: 'Numeric Input' },
                    ]} />
                    <TextInput source="imageUrl" type="url" label="Image URL" fullWidth />
                    <TextInput source="videoUrl" type="url" label="Video URL" fullWidth />

                    <ArrayInput source="answerChoices" label="Answer Choices">
                        <SimpleFormIterator>
                            <TextInput source="label" label="Label" />
                            <TextInput source="value" label="Value" />
                        </SimpleFormIterator>
                    </ArrayInput>

                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
)

export const QuizEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="publishStatus" />
            <TextInput source="name" fullWidth />

            <ReferenceInput label="Teaching Module" source="teachingModuleId" reference="teachingModules">
                <SelectInput source="name" label="Teachin Module" />
            </ReferenceInput>
            
            <RichTextInput source="introText" />
            <RichTextInput source="finalText" />
            <RichTextInput source="timeoutText" />
            <NumberInput source="allowedDuration" />
            <DateInput source="timeCreated" />
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <TextInput source="title" label="Title" fullWidth />
                    <TextInput source="content" label="Text" required multiline fullWidth />
                    <SelectInput source="answerType" label="Question Type" choices={[
                        { id: 'RADIO_SELECT', name: 'Radio Select' },
                        { id: 'SHORT_TEXT', name: 'Short Text' },
                        { id: 'NUMERIC_INPUT', name: 'Numeric Input' },
                    ]} />
                    <TextInput source="imageUrl" type="url" label="Image URL" fullWidth />
                    <TextInput source="videoUrl" type="url" label="Video URL" fullWidth />

                    <ArrayInput source="answerChoices" label="Answer Choices">
                        <SimpleFormIterator>
                            <TextInput source="label" label="Label" />
                            <TextInput source="value" label="Value" />
                        </SimpleFormIterator>
                    </ArrayInput>

                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
)
