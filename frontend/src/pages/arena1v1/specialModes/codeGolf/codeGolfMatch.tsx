import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBolt,
    faCode, faFire,
    faFlagCheckered,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import s from './codeGolfMatch.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import type { CodeGolfBattleStartedPayload } from '@funcode/shared';
import {
    onBattleAborted,
    onCodeGolfScoreUpdated, onDraw,
    onError,
    onLose,
    onWin,
    onWrongSubmit,
    sendCode
} from '../../../../services/socket/gameSocket.ts';
import { useAuth } from '../../../../context/authContext.ts';
import { ROUTES } from '../../../../constants/routes.ts';

export function CodeGolfMatch() {
    const user = useAuth();
    const userId = user.user?.userId;
    const location = useLocation();
    const navigate = useNavigate();
    const { task, endsAt } = location.state as CodeGolfBattleStartedPayload;
    const [code, setCode] = useState(task.code);
    const [submitStatus, setSubmitStatus] = useState<'valid' | 'invalid' | null>(null);
    const [myBestScore, setMyBestScore] = useState(task.code.length);
    const [opponentBestScore, setOpponentBestScore] = useState(task.code.length);
    const [remainingSeconds, setRemainingSeconds] = useState(
        () => Math.max(0, Math.ceil((endsAt - Date.now()) / 1000))
    );
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const characterCount = code.length;
    const canBeatBestScore = characterCount < myBestScore;
    const isInstantWinZone = characterCount <= task.instantWinLimit;
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
            navigate(ROUTES.MATCH_WIN);
        });

        const offLose = onLose(() => {
            navigate(ROUTES.MATCH_LOSE);
        });

        const offDraw = onDraw(() => {
            navigate(ROUTES.MATCH_DRAW);
        })

        const offAborted = onBattleAborted((payload) => {
            navigate('/home/arena', {
                replace: true,
                state: { errorCode: payload.code }
            })
        })

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

        const interval = setInterval(() => {
            setRemainingSeconds(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
        }, 1000);

        return () => {
            offWrong();
            offWin();
            offLose();
            offDraw();
            offError();
            offAborted();
            offCodeGolfScoreUpdate();
            clearTimeout(submitTimeout);
            clearInterval(interval);
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
                        <div className={`${s.playerBar} ${s.myBar}`} style={{
                                width: `${getScoreShare(
                                    myBestScore,
                                    opponentBestScore,
                                )}%`,
                            }}>
                            <span> You · {myBestScore} </span>
                        </div>
                        <div className={`${s.playerBar} ${s.opponentBar}`} style={{
                                width: `${getScoreShare(
                                    opponentBestScore,
                                    myBestScore,
                                )}%`,
                            }}>
                            <span> {opponentBestScore} · Opponent </span>
                        </div>
                    </div>
                </div>
                <div className={`${s.timer} ${remainingSeconds <= 60 ? s.timerDanger : ''}`}>
                    <span className={s.timerLabel}>TIME LEFT</span>
                    <span className={s.timerValue}>
                        {minutes}:{seconds.toString().padStart(2, '0')}
                    </span>
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
                    ${submitStatus === 'valid' ? s.validEditor : ''}
                    ${(isInstantWinZone && submitStatus !== 'invalid') ? s.instantWinEditor : ''}`}
                >

                    {isInstantWinZone && (
                        <div className={s.fireGlow} aria-hidden="true" />
                    )}

                    <div className={s.editorHeader}>
                        <span>
                            <FontAwesomeIcon icon={faCode} />
                            solution.js
                        </span>

                        <div className={s.editorStats}>
                            <span className={`${s.instantWinTarget} ${isInstantWinZone ? s.instantWinReached : ''}`}>
                                <FontAwesomeIcon icon={faBolt} />
                                Instant Win ≤ {task.instantWinLimit}
                            </span>

                            <span className={`${s.counter} ${!canBeatBestScore ? s.counterOverLimit : ''}`}>
                                {characterCount} / {myBestScore}
                            </span>
                        </div>
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
                        className={`
                            ${s.submitButton}
                            ${isInstantWinZone ? s.instantWinButton : ''}
                        `}
                        disabled={!canBeatBestScore}
                        onClick={handleSubmit}
                    >
                        {isInstantWinZone ? (
                            <>
                                <FontAwesomeIcon icon={faFire} />
                                Instant Win
                            </>
                        ) : (
                            'Submit solution'
                        )}
                    </button>
                </div>
            </section>
        </main>
    );
}
