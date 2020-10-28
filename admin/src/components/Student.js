import React from 'react'

import {
    List, Datagrid, TextField, EmailField, Create, Edit, SimpleForm,
    TextInput, NumberInput,
    required
} from 'react-admin'

export const StudentList = props => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid rowClick="edit">
            <TextField source="firstName" />
            <TextField source="lastName" />
            <EmailField source="email" />
        </Datagrid>
    </List>
)

export const StudentCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
)

export const StudentEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
)