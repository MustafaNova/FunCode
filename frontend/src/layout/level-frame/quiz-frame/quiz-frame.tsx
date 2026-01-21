import s from "./quiz-frame.module.scss"
import { useState } from 'react';
import clsx from 'clsx';
import { questions } from './data/questions.tsx';
type props = {
    isVisible: boolean
}
type Selected = number | null;

export function QuizFrame({isVisible} : props) {
    const subtitleTxt = "Der HTML DOM (Document Object Model) stellt eine Webseite als Baumstruktur aus Objekten dar, die JavaScript lesen und verändern kann";
    const headerTxt = "Quiz: HTML-DOM";
    const [selected, setSelected] = useState<Selected>(null);
    const [score, setScore] = useState(0);
    const [questionNum, setQuestionNum] = useState(0);



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
                        <span>{questionNum + 1} / 4</span>
                    </span>
                    </div>
                    <div className={s.progressBar}>
                        <div className={s.barFill}></div>
                    </div>
                </div>

            </div>
            <div className={s.panel}>
                <div className={s.quizHeader}>
                    <div className={s.qNum}>{questionNum + 1}</div>
                    <div className={s.question}>{questions[questionNum].question}</div>
                </div>
                <div className={s.subtitle}>{questions[questionNum].hint}</div>
                <div className={s.options}>
                    {[0,1,2,3].map((i) => (
                        <button onClick={() => setSelected(i)} key={i} className={clsx(
                            s.opt,
                            selected != null && i == questions[questionNum].correct && s.correct,
                            selected != null && i == selected && selected != questions[questionNum].correct && s.wrong,
                        )}
                        >
                            {questions[questionNum].answers[i]}
                        </button>
                    ))}
                    <button onClick={() => setQuestionNum(questionNum+1)} className={s.nextQ}>next question</button>
                </div>

            </div>
        </div>
    )
}