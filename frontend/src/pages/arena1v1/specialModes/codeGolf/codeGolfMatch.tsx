import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faFlagCheckered,
    faKeyboard, faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import s from './codeGolfMatch.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import type { CodeGolfTaskDto, SubmitResponse } from '@funcode/shared';
import {
    onCodeGolfSubmitRes,
    onError,
    onLose,
    onWin,
    onWrongSubmit,
    sendCode
} from '../../../../services/socket/gameSocket.ts';

export function CodeGolfMatch() {
    const location = useLocation();
    const navigate = useNavigate();
    const task: CodeGolfTaskDto = location.state;
    const [code, setCode] = useState(task.code);
    const [submitResponse, setSubmitResponse] = useState<SubmitResponse | null>(null);
    const [bestScore, setBestScore] = useState(task.code.length);
    const characterCount = code.length;
    const canBeatBestScore = characterCount < bestScore;

    useEffect(() => {
        const offWrong = onWrongSubmit((res) => {
            setSubmitResponse(res);
        })

        const offError = onError((res) => {
            console.log(res);
        })

        const offWin = onWin(() => {
            navigate('/match/win');
        })

        const offLose = onLose(() => {
            navigate('/match/lose');
        })

        const offSubmitRes = onCodeGolfSubmitRes((data) => {
            console.log(data.valid)
            if (data.valid) {
                setBestScore(code.length);
            } else {
                console.log('wrong')
            }

        })

        return () => {
            offWrong();
            offWin();
            offLose();
            offError();
            offSubmitRes();
        }
    }, [navigate])

    function handleSubmit() {
        if (!canBeatBestScore) return;
        sendCode({ taskId: task.id, code })
    }

    return (
        <main className={`${s.container} galaxyGridBackground`}>
            <section className={s.matchPanel}>
                <header className={s.header}>
                    <div>
                        <span className={s.kicker}>
                            <FontAwesomeIcon icon={faFlagCheckered} />
                            Code Golf · 1v1
                        </span>
                        <h1>{task.name}</h1>
                        <p className={s.description}>{task.description}</p>
                    </div>

                    {submitResponse && (
                        <span className={s.feedbackMessage}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            {submitResponse.playerName} had a failed submit
                            </span>
                    )}

                    <div className={s.limitCard}>
                        <FontAwesomeIcon icon={faKeyboard} />
                        <div>
                            <span>Best Score</span>
                            <strong>{bestScore}</strong>
                        </div>
                    </div>
                </header>

                <div className={s.editorSection}>
                    <div className={s.editorHeader}>
                        <span>
                            <FontAwesomeIcon icon={faCode} />
                            solution.js
                        </span>

                        <span
                            className={`${s.counter} ${
                                !canBeatBestScore ? s.counterOverLimit : ''
                            }`}
                        >
                            {characterCount} / {bestScore}
                        </span>
                    </div>

                    <Editor
                        height="520px"
                        language={task.language}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value ?? '')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 16 },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </div>

                <div className={s.footer}>
                    <div>
                        <span className={s.footerLabel}>
                            Current solution
                        </span>

                        <strong
                            className={
                                !canBeatBestScore ? s.overLimitText : undefined
                            }
                        >
                            {characterCount} characters
                        </strong>
                    </div>

                    <button
                        className={s.submitButton}
                        disabled={!canBeatBestScore}
                        onClick={handleSubmit}
                    >
                        Submit Solution
                    </button>
                </div>
            </section>
        </main>
    );
}