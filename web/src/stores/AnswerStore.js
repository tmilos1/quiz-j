import { observable, decorate } from "mobx"

class AnswerStore {
    answers =[]
}

decorate(
    AnswerStore,
    {
        answers: observable,
    }
)

export default AnswerStore
