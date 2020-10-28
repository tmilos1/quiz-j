import { observable, decorate } from "mobx"

class QuestionsStore {
    questions = []
}

decorate(
    QuestionsStore,
    {
        questions: observable,
    }
)

export default QuestionsStore
