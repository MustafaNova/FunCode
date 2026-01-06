import "./quiz-frame.scss"

type props = {
    isVisible: boolean
}

export function QuizFrame({isVisible} : props) {

    return (
        <div className={isVisible ? "" : "hidden"}>
            <h1>quiz works!</h1>
        </div>
    )
}