
const answerType = {
    RADIO_SELECT: 'RADIO_SELECT',
    CHECKBOX: 'CHECKBOX',
    SHORT_TEXT: 'SHORT_TEXT',
    NUMERIC_INPUT: 'NUMERIC_INPUT'
}

const quizSessionStatus = {
    NOT_STARTED: 'NOT_STARTED',
    RUNNING: 'RUNNING',
    FINISHED: 'FINISHED',
    TIMEOUT: 'TIMEOUT'
}

const quizPublishStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
}

const constants = {
    answerType,
    quizSessionStatus,
    quizPublishStatus
}

module.exports = Object.freeze(constants)
