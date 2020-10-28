import React from 'react'

const AnswerTypeField = ({ record = {} }) => {
    let label=""

    switch (record.answerType) {
        case 'RADIO_SELECT':
            label = 'Multiple choice'
            break
        case 'YES_NO':
            label = 'True/False'
            break
        case 'NUMERIC_INPUT':
            label = 'Numeric Input'
            break
        default:
            label = 'Short Text'
    }

    return (
        <>
            {label}
        </>
    )
}

export default AnswerTypeField
