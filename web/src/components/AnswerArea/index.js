import React from 'react'

import RadioSelect from '../AnswerTypes/RadioSelect'
import CheckboxSelect from '../AnswerTypes/CheckboxSelect'
import ShortText from '../AnswerTypes/ShortText'
import NumericInput from '../AnswerTypes/NumericInput'
import YesNo from '../AnswerTypes/YesNo'

import answerTypes from '../../constants'

const AnswerArea = (props) => {

    let answerType

    switch (props.type) {
        case answerTypes.RADIO_SELECT:
            answerType = <RadioSelect />
            break;
        case answerTypes.CHECKBOX:
            answerType = <CheckboxSelect />
            break;
        case answerTypes.SHORT_TEXT:
            answerType = <ShortText />
            break;
        case answerTypes.NUMERIC_INPUT:
            answerType = <NumericInput />
            break;
        case answerTypes.YES_NO:
            answerType = <YesNo />
            break;
        default:
            answerType = <ShortText />
            break;
    }

    return (
        <>
            {answerType}
        </>
    )
}

export default AnswerArea
