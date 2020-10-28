import React from 'react'

import {
    List, Datagrid, TextField, EmailField, Create, Edit, SimpleForm, SimpleFormIterator,
    ArrayInput, TextInput, NumberInput,
    ReferenceInput, SelectInput,
    Show, SimpleShowLayout, ArrayField, ReferenceField,
    ReferenceArrayField, SingleFieldList, ChipField,
    required
} from 'react-admin'

export const InstructorList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="firstName" />
            <TextField source="lastName" />
        </Datagrid>
    </List>
)

export const InstructorShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="firstName" />
            <TextField source="lastName" />
            <ArrayField source="teachingModules">
                <Datagrid>
                    <TextField source="name" />

                    <ArrayField source="students">
                        <Datagrid>
                            <ReferenceField source="studentId" reference="students">
                                <StudentFieldList />
                            </ReferenceField>
                        </Datagrid>
                    </ArrayField>


                </Datagrid>
            </ArrayField>

        </SimpleShowLayout>
    </Show>
)

const StudentFieldList = ({ source, record = {} }) => {
    return (
        <>
            <TextField record={record} source="firstName" />
            &nbsp;
            <TextField record={record} source="lastName" />
            &nbsp;
            - <EmailField record={record} source="email" />
        </>
    )
}

export const InstructorCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <ArrayInput source="teachingModules" >

                <SimpleFormIterator>
                    <TextInput source="name" label="Module name" />

                    <ArrayInput source="students" label="Students">
                        <SimpleFormIterator>
                            <ReferenceInput source="studentId" reference="students" label="Name" >
                                <SelectInput optionText={StudentSelectInput} />
                            </ReferenceInput>
                        </SimpleFormIterator>
                    </ArrayInput>

                </SimpleFormIterator>

            </ArrayInput>
        </SimpleForm>
    </Create>
)

export const InstructorEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <ArrayInput source="teachingModules" >

                <SimpleFormIterator>
                    <TextInput source="name" label="Module name" />

                    <ArrayInput source="students" label="Students">
                        <SimpleFormIterator>
                            <ReferenceInput source="studentId" reference="students" label="Name" >
                                <SelectInput optionText={StudentSelectInput} />
                            </ReferenceInput>
                        </SimpleFormIterator>
                    </ArrayInput>

                </SimpleFormIterator>

            </ArrayInput>
        </SimpleForm>
    </Edit>
)

const StudentSelectInput = (record) => record.firstName + ' ' + record.lastName
