import s from "./quiz-frame.module.scss"
import { useState } from 'react';
import clsx from 'clsx';
import { quizData } from './data/questions.tsx';
type props = {
    isVisible: boolean
}
type Selected = number | null;

export function QuizFrame({isVisible} : props) {
    const subtitleTxt = "Der HTML DOM (Document Object Model) stellt eine Webseite als Baumstruktur aus Objekten dar, die JavaScript lesen und verändern kann";
    const headerTxt = "Quiz: HTML-DOM";
    const [selected, setSelected] = useState<Selected>(null);
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState(0);
    const [questionNum, setQuestionNum] = useState(0);
    const curQ = quizData[questionNum];
    const isAnswered = selected !== null;
    const isCorrect = selected === curQ.correct;

    function chooseAnswer(i: number) {
        if (selected !== null) return;
        setSelected(i);
        if (i == curQ.correct) setScore(prev => prev + 1);
        setProgress(prev => Math.min(prev + 25, 100))
    }

    function nextQuestion() {
        if (selected == null) return;
        setQuestionNum(prev => prev + 1);
        setSelected(null);
    }

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
                        <div
                            className={s.barFill}
                            style={ {width: `${progress}%`} }
                        ></div>
                    </div>
                </div>

            </div>
            <div className={s.panel}>
                <div className={s.quizHeader}>
                    <div className={s.qNum}>{questionNum + 1}</div>
                    <div className={s.question}>{curQ.question}</div>
                </div>
                <div className={s.subtitle}>{curQ.hint}</div>
                <div className={s.options}>
                    {[0,1,2,3].map((i) => (
                        <button onClick={() => chooseAnswer(i)} key={i} className={clsx(
                            s.opt,
                            selected != null && i == curQ.correct && s.correct,
                            selected != null && i == selected && selected != curQ.correct && s.wrong,
                        )}>
                            <div className={clsx(s.radio, {[s.purpleBorder]: i === selected})}></div>
                            {curQ.answers[i]}
                        </button>
                    ))}
                    <div className={clsx(s.opt,s.hidden, isAnswered && (isCorrect ? s.ok : s.bad))}>
                        { isCorrect ? "✅ " + curQ.correctMsg : "❌ " + curQ.falseMsg }
                    </div>
                    <button onClick={() => nextQuestion()} className={s.nextQ}>next question</button>
                </div>

            </div>
        </div>
    )
}