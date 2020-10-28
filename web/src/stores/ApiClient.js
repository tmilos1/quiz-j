
export class ApiClient {
    constructor(questionsStore, answerStore) {
        this.apiUrl = process.env.REACT_APP_API_URL
    }

    createQuizSession = async (quizCode, userEmail) => {
        return await fetch(
            this.apiUrl + '/quizSessions',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },          
                body: JSON.stringify({
                    quizCode: quizCode,
                    userEmail: userEmail
                })                
            }
        )
    }        

    changeQuizSessionStatus = async(quizSessionId, status) => {
        return await fetch(
            this.apiUrl + '/quizSessions/' + quizSessionId + '/status',
            {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: status
                })                
            }
        )
    }

    fetchQuizSession = async (quizSessionId) => {
        return await fetch(this.apiUrl + '/quizSessions/' + quizSessionId)
    }    

    fetchQuizSessionByQuizCodeAndEmail = async (quizCode, userEmail) => {
        return await fetch(this.apiUrl + '/quizSessions/quizCode/' + quizCode + '/userEmail/' + userEmail)
    }    

    fetchQuiz = async (quizId) => {
        return await fetch(this.apiUrl + '/quizzes/' + quizId)
    }

    saveQuizAnswer = async(quizSessionId, currentQuestionIndex, questionId, answerValue) => {       
        return await fetch(
            this.apiUrl + '/quizSessions/' + quizSessionId + '/answer',
            {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentQuestionIndex: currentQuestionIndex,
                    questionId: questionId,
                    answer: answerValue
                })                
            }
        )
    }        

    checkCorrectAnswers = async(quizSessionId) => {
        return await fetch(
            this.apiUrl + '/quizSessions/checkCorrectAnswers',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },          
                body: JSON.stringify({
                    quizSessionId: quizSessionId
                })                
            }
        )        
    }
}
