import React from 'react'
// import makeInspectable from 'mobx-devtools-mst'

import QuizStore from './QuizStore'
import QuestionsStore from './QuestionsStore'
import AnswerStore from './AnswerStore'

// const appStore = makeInspectable(new QuestionsStore())

const questionsStore = new QuestionsStore()
const answerStore = new AnswerStore()

const appContext = React.createContext({
    quizStore: new QuizStore(questionsStore, answerStore),
    questionsStore: questionsStore,
    answerStore: answerStore,
})

export const useAppContext = () => React.useContext(appContext)
