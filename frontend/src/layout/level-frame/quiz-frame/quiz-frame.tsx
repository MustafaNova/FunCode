import s from "./quiz-frame.module.scss"
import clsx from 'clsx';
type props = {
    isVisible: boolean
}

export function QuizFrame({isVisible} : props) {
    const subtitleTxt = "Der HTML DOM (Document Object Model) stellt eine Webseite als Baumstruktur aus Objekten dar, die JavaScript lesen und verändern kann"
    const headerTxt = "Quiz: HTML-DOM"
    const score = 0
    const question = 1


    return (
        <div className={clsx({[s.hidden] : !isVisible}, s.content)}>
            <div className={s.panel}>
                <div className={s.header}>
                    {headerTxt}
                </div>
                <div className={s.subtitle}>
                    {subtitleTxt}
                </div>
                <div className={s.infos}>
                    <div className={s.curStats}>
                    <span className={s.statsBox}>
                        <span>⭐ Score :</span>
                        <span>{score}</span>
                    </span>
                        <span className={s.statsBox}>
                        <span>🧩 Frage </span>
                        <span>{question} / 4</span>
                    </span>
                    </div>
                    <div className={s.progressBar}>
                        <div className={s.barFill}></div>
                    </div>
                </div>

            </div>
            <div className={s.panel}>
                <div className={s.quizHeader}>
                    <div className={s.qNum}>{question}</div>
                    <div className={s.question}> Was schickt der Browser zuerst an den Server, wenn du eine Website öffnest</div>
                </div>
                <div className={s.subtitle}>Tipp: Denke an Request und Response</div>
                <div className={s.options}>
                    <div className={s.opt}></div>
                    <div className={s.opt}></div>
                    <div className={s.opt}></div>
                    <div className={s.opt}></div>
                    <div className={s.opt}></div>
                </div>
            </div>
        </div>
    )
}