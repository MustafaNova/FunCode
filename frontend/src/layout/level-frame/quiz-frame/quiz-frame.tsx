import s from "./quiz-frame.module.scss";
import { useState } from "react";
import clsx from "clsx";
import type { props } from "./types.ts";

export function QuizFrame({ isVisible, quizData, onFinish, onHeartLose }: props) {
    const subtitleTxt = "Beantworte Fragen, sammle Punkte und zeige, was du gelernt hast.";
    const headerTxt = "Knowledge Check";
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [questionNum, setQuestionNum] = useState(1);
    const [nextDisabled, setNextDisabled] = useState<boolean>(true);
    const totalQuestions = quizData.length;
    const curQ = quizData[questionNum - 1];
    const isAnswered = selected !== null;
    const isCorrect = selected === curQ.correct;
    const progress = Math.round(((questionNum - 1 + (isAnswered ? 1 : 0)) / totalQuestions) * 100);

    function chooseAnswer(i: number) {
        if (selected !== null) return;
        const answerCorrect = i === curQ.correct;
        const isLastQuestion = questionNum === totalQuestions;

        setSelected(i);

        if (answerCorrect) {
            setScore((prev) => prev + 1);
        } else {
            onHeartLose();
        }

        if (isLastQuestion) {
            onFinish();
        } else {
            setNextDisabled(false);
        }
    }

    function nextQuestion() {
        if (selected === null) return;
        setQuestionNum((prev) => prev + 1);
        setSelected(null);
        setNextDisabled(true);
    }

    return (
        <div className={clsx({ [s.hidden]: !isVisible }, s.content)}>
            <div className={s.panel}>
                <div className={s.header}>{headerTxt}</div>
                <div className={s.subtitle}>{subtitleTxt}</div>
                <div className={s.infos}>
                    <div className={s.curStats}>
                    <span className={s.statsBox}>
                        <span>⭐ Score :</span>
                        <span>{score}</span>
                    </span>
                        <span className={s.statsBox}>
                        <span>🧩 Frage </span>
                        <span>{questionNum} / 3</span>
                    </span>
                    </div>
                    <div className={s.progressBar}>
                        <div className={s.barFill} style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>
            <div className={s.panel}>
                <div className={s.quizHeader}>
                    <div className={s.qNum}>{questionNum}</div>
                    <div className={s.question}>{curQ.question}</div>
                </div>
                <div className={s.subtitle}>{curQ.hint}</div>
                <div className={s.options}>
                    {[0, 1, 2, 3].map((i) => (
                        <button
                            onClick={() => chooseAnswer(i)}
                            key={i}
                            className={clsx(
                                s.opt,
                                selected != null && i === curQ.correct && s.correct,
                                selected != null && i === selected && selected !== curQ.correct && s.wrong
                            )}
                        >
                            <div className={clsx(s.radio, { [s.purpleBorder]: i === selected })} />
                            {curQ.answers[i]}
                        </button>
                    ))}
                    {isAnswered && <div className={clsx(s.opt, isCorrect ? s.ok : s.bad)}>
                        { isCorrect ? "✅ " + curQ.correctMsg : "❌ " + curQ.falseMsg }
                    </div>}

                    {!nextDisabled && (
                        <button
                            onClick={() => nextQuestion()} className={s.nextQ}>
                            Next question
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
