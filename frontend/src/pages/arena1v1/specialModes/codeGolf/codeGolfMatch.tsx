import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faFlagCheckered,
    faKeyboard,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import s from './codeGolfMatch.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import type { CodeGolfTaskDto } from '@funcode/shared';
import {
    onCodeGolfScoreUpdated,
    onError,
    onLose,
    onWin,
    onWrongSubmit,
    sendCode
} from '../../../../services/socket/gameSocket.ts';
import { useAuth } from '../../../../context/authContext.ts';

export function CodeGolfMatch() {
    const user = useAuth();
    const userId = user.user?.userId;
    const location = useLocation();
    const navigate = useNavigate();
    const task: CodeGolfTaskDto = location.state;
    const [code, setCode] = useState(task.code);
    const [submitStatus, setSubmitStatus] = useState<'valid' | 'invalid' | null>(null);
    const [myBestScore, setMyBestScore] = useState(task.code.length);
    const [opponentBestScore, setOpponentBestScore] = useState(task.code.length);
    const characterCount = code.length;
    const canBeatBestScore = characterCount < myBestScore;
    const SUBMIT_FEEDBACK_DURATION_MS = 500;

    useEffect(() => {
        let submitTimeout: ReturnType<typeof setTimeout>;

        const offWrong = onWrongSubmit(() => {
            clearTimeout(submitTimeout);
            setSubmitStatus('invalid');
            submitTimeout = setTimeout(() => {
                setSubmitStatus(null);
            }, SUBMIT_FEEDBACK_DURATION_MS);
        });

        const offError = onError((res) => {
            console.log(res);
        });

        const offWin = onWin(() => {
            navigate('/match/win');
        });

        const offLose = onLose(() => {
            navigate('/match/lose');
        });

        const offCodeGolfScoreUpdate = onCodeGolfScoreUpdated((payload) => {
            if (payload.userId !== userId) {
                setOpponentBestScore(payload.bestScore);
                return;
            }

            setMyBestScore(payload.bestScore);
            clearTimeout(submitTimeout);
            setSubmitStatus('valid');
            submitTimeout = setTimeout(() => {
                setSubmitStatus(null);
            }, SUBMIT_FEEDBACK_DURATION_MS);

        });

        return () => {
            offWrong();
            offWin();
            offLose();
            offError();
            offCodeGolfScoreUpdate();
            clearTimeout(submitTimeout);
        }
    }, [navigate]);

    function handleSubmit() {
        if (!canBeatBestScore) return;
        sendCode({ taskId: task.id, code })
    }

    function getScoreShare(
        score: number,
        opponentScore: number,
    ): number {
        const myStrength = 1 / score;
        const opponentStrength = 1 / opponentScore;

        return (
            myStrength /
            (myStrength + opponentStrength)
        ) * 100;
    }

    return (
        <main className={`${s.container} galaxyGridBackground`}>
            <section className={s.matchPanel}>
                <div className={s.scoreBattle}>
                    <div className={s.scoreTrack}>
                        <div
                            className={`${s.playerBar} ${s.myBar}`}
                            style={{
                                width: `${getScoreShare(
                                    myBestScore,
                                    opponentBestScore,
                                )}%`,
                            }}
                        >
            <span>
                You · {myBestScore}
            </span>
                        </div>

                        <div
                            className={`${s.playerBar} ${s.opponentBar}`}
                            style={{
                                width: `${getScoreShare(
                                    opponentBestScore,
                                    myBestScore,
                                )}%`,
                            }}
                        >
            <span>
                {opponentBestScore} · Opponent
            </span>
                        </div>
                    </div>
                </div>
                <header className={s.header}>
                    <div>
                        <span className={s.kicker}>
                            <FontAwesomeIcon icon={faFlagCheckered} />
                            Code Golf · 1v1
                        </span>
                        <h1>{task.name}</h1>
                        <p className={s.description}>{task.description}</p>
                    </div>
                </header>

                <div className={
                    `${s.editorSection}
                    ${submitStatus === 'invalid' ? s.invalidEditor : ''}
                    ${submitStatus === 'valid' ? s.validEditor : ''}`}>
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
                            {characterCount} / {myBestScore}
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
