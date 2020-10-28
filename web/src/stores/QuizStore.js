import { observable, decorate } from "mobx"
import answerTypes, { quizStatus } from '../constants'
import { ApiClient } from './ApiClient'

class QuizStore {
    quizSessionId = 0
    userEmail = ""

    currentQuestionIndex = 0
    timer = 0
    mailSlug = ''
    loaded = false
    loadError = false

    status = quizStatus.NOT_STARTED

    introText = ""
    finalText = ""
    timeoutText = ""

    constructor(questionsStore, answerStore) {
        this.questionsStore = questionsStore
        this.answerStore = answerStore

        this.apiClient = new ApiClient()
    }

    // public
    setQuizCode = (quizCode) => {
        this.quizCode = quizCode
    }

    // public
    fetchQuizSession = async () => {
        const quizSessionData = await this.getQuizSessionData()
        if (!quizSessionData) {
            return
        }

        this.currentQuestionIndex = quizSessionData.currentQuestionIndex

        this.answerStore.answers = quizSessionData.answers.map(answer => {
            return {
                questionId: answer.questionId,
                value: answer.content,
            }
        })

        const quizResponse = await this.apiClient.fetchQuiz(quizSessionData.quizId)
        const quizData = await quizResponse.json()

        this.quizSessionId = quizSessionData._id
        this.quizDuration = quizData.allowedDuration * 60 * 1000

        this.name = quizData.name ? quizData.name : ""
        this.introText = quizData.introText ? quizData.introText : "Welcome to quiz"
        this.timeoutText = quizData.timeoutText ? quizData.timeoutText : "Timout"
        this.finalText = quizData.finalText ? quizData.finalText : "Quiz is finished"

        this.questionsStore.questions = quizData.questions.map(question => {
            let answers

            if (question.answerType === answerTypes.RADIO_SELECT) {
                answers = question.answerChoices.map((answerChoice, index) => {
                    const choiceNo = index + 1
                    
                    return {
                        label: answerChoice.label,
                        value: "Choice_" + choiceNo
                    }
                })
            } else {
                answers = question.answerChoices.map(answerChoice => {
                    return {
                        label: answerChoice.label,
                        value: answerChoice.label
                            .toLowerCase()
                            .replace(/\s/g, '')
                            .replace(/[.,!?-_#;:(){}$%^'"]/g, '')
                    }
                })
            }

            return {
                title: question.title,
                content: question.content,
                type: question.answerType,
                image_url: question.imageUrl,
                video_url: question.videoUrl,
                answers: answers
            }
        })

        const runningTime = Math.abs(new Date() - new Date(quizSessionData.timeStarted))
        this.timer = Date.now() + this.quizDuration - runningTime

        this.status = quizSessionData.sessionStatus
        this.loaded = true
    }

    getQuizSessionData = async () => {
        let quizSessionResponse = await this.apiClient.fetchQuizSessionByQuizCodeAndEmail(this.quizCode, this.userEmail)

        let quizSessionData = await quizSessionResponse.json()

        if (quizSessionData === null || !quizSessionData._id) {
            quizSessionResponse = await this.apiClient.createQuizSession(this.quizCode, this.userEmail)
            quizSessionData = await quizSessionResponse.json()
        }

        if (quizSessionData === null || !quizSessionData._id) {
            this.loadError = true
            return
        }

        return quizSessionData
    }

    // public
    startQuiz = async () => {
        this.status = quizStatus.RUNNING
        this.timer = Date.now() + this.quizDuration

        const quizSessionResponse = await this.apiClient.fetchQuizSession(this.quizSessionId)
        const quizSessionData = await quizSessionResponse.json()

        await this.apiClient.changeQuizSessionStatus(quizSessionData._id, quizStatus.RUNNING)

        this.currentQuestionIndex = 0
    }

    // public
    finishQuiz = async () => {
        this.status = quizStatus.FINISHED

        // save the last question
        const quizSessionResponse = await this.apiClient.fetchQuizSession(this.quizSessionId)
        const quizSessionData = await quizSessionResponse.json()

        await this.apiClient.saveQuizAnswer(...this.getSaveQuizAnswerParams())

        await this.apiClient.changeQuizSessionStatus(quizSessionData._id, quizStatus.FINISHED)

        await this.apiClient.checkCorrectAnswers(quizSessionData._id)
    }

    getSaveQuizAnswerParams = () => {
        return [
            this.quizSessionId,
            this.currentQuestionIndex,
            this.answerStore.answers[this.currentQuestionIndex].questionId,
            this.answerStore.answers[this.currentQuestionIndex].value
        ]
    }

    // public
    timeoutQuiz = async () => {
        this.status = quizStatus.TIMEOUT

        const quizSessionResponse = await this.apiClient.fetchQuizSession(this.quizSessionId)
        const quizSessionData = await quizSessionResponse.json()

        await this.apiClient.saveQuizAnswer(...this.getSaveQuizAnswerParams())
        await this.apiClient.changeQuizSessionStatus(quizSessionData._id, quizStatus.FINISHED)
    }

    // public
    nextQuestion = async () => {
        await this.apiClient.saveQuizAnswer(...this.getSaveQuizAnswerParams())

        this.currentQuestionIndex++
    }

    // public
    previousQuestion = async () => {
        await this.apiClient.saveQuizAnswer(...this.getSaveQuizAnswerParams())

        this.currentQuestionIndex--
    }

    // public
    isLastQuestion = () => {
        return this.currentQuestionIndex === this.questionsStore.questions.length - 1
    }

    // public
    isFirstQuestion = () => {
        return this.currentQuestionIndex === 0
    }

    // public
    displayFinishButton = () => {
        return this.isLastQuestion()
    }
}

decorate(
    QuizStore,
    {
        userEmail: observable,
        quizLinkId: observable,
        currentQuestionIndex: observable,
        timer: observable,
        status: observable,
        introText: observable,
        finalText: observable,
        timeoutText: observable,
        mailSlug: observable,
        loaded: observable,
        loadError: observable
    }
)

export default QuizStore
