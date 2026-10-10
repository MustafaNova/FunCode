import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBolt,
    faCode, faFire,
    faFlagCheckered,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import s from './codeGolfMatch.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import type { CodeGolfBattleStartedPayload } from '@funcode/shared';
import {
    onBattleAborted, onCodeGolfLose, onCodeGolfOpponentActivity,
    onCodeGolfBestScoreUpdated, onCodeGolfWin, onDraw,
    onError,
    sendCode, sendCodeGolfActivity, onOpponentIsSubmitting, onCodeGolfWrongSubmit
} from '../../../../services/socket/gameSocket.ts';
import { useAuth } from '../../../../context/authContext.ts';
import { ROUTES } from '../../../../constants/routes.ts';
import { MatchQuickChat } from '../../../../components/MatchQuickChat/matchQuickChat.tsx';
import { useMatchMessages } from '../../../../hooks/useMatchMessages.ts';
import { SurrenderButton } from '../../../../components/SurrenderButton/surrenderButton.tsx';

export function CodeGolfMatch() {
    const user = useAuth();
    const { myMessage, opponentMessage, handleSendMessage } = useMatchMessages();
    const userId = user.user?.userId;
    const location = useLocation();
    const navigate = useNavigate();
    const { task, matchEndsAt, preparationEndsAt } = location.state as CodeGolfBattleStartedPayload;
    const [code, setCode] = useState(task.code);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'valid' | 'invalid' | null>(null);
    const submitTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isOpponentSubmitting, setIsOpponentSubmitting] = useState(false);
    const [opponentSubmitStatus, setOpponentSubmitStatus] = useState<'valid' | 'invalid' | null>(null);
    const opponentSubmitTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [myBestScore, setMyBestScore] = useState(task.code.length);
    const [opponentBestScore, setOpponentBestScore] = useState(task.code.length);
    const [opponentCharacterCount, setOpponentCharacterCount] = useState(task.code.length);
    const [remainingSeconds, setRemainingSeconds] = useState(
        () => Math.max(0, Math.ceil((matchEndsAt - Date.now()) / 1000))
    );
    const [isPreparation, setIsPreparation] = useState(() => Date.now() < preparationEndsAt);
    const [preparationSeconds, setPreparationSeconds] = useState(
        () => Math.max(0, Math.ceil((preparationEndsAt - Date.now()) / 1000))
    );
    const [isOpponentTyping, setIsOpponentTyping] = useState(false);
    const opponentTypingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastActivitySentAt = useRef(0);
    const activityTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const characterCount = code.length;
    const canBeatBestScore = characterCount < myBestScore;
    const isInstantWinZone = characterCount <= task.instantWinLimit;
    const isOpponentInstantWinZone = opponentCharacterCount <= task.instantWinLimit;
    const SUBMIT_FEEDBACK_DURATION_MS = 500;
    const OPPONENT_TYPING_DURATION_MS = 500;

    useEffect(() => {

        const offCodeGolfWrongSubmit = onCodeGolfWrongSubmit((payload) => {
            if (payload.userId != userId) {
                setIsOpponentSubmitting(false);
                setOpponentSubmitStatus('invalid');

                if (opponentSubmitTimeout.current) {
                    clearTimeout(opponentSubmitTimeout.current);
                }

                opponentSubmitTimeout.current = setTimeout(() => {
                    setOpponentSubmitStatus(null);
                }, SUBMIT_FEEDBACK_DURATION_MS)
                return;
            }

            setIsSubmitting(false);
            setSubmitStatus('invalid');

            if (submitTimeout.current) {
                clearTimeout(submitTimeout.current);
            }

            submitTimeout.current = setTimeout(() => {
                setSubmitStatus(null);
            }, SUBMIT_FEEDBACK_DURATION_MS);
        });

        const offError = onError((res) => {
            setIsSubmitting(false);
            console.log(res);
        });

        const offWin = onCodeGolfWin((payload) => {
            if (payload.reason == 'normal') {
                navigate(ROUTES.MATCH_WIN);
            } else {
                navigate(ROUTES.CODE_GOLF_INSTANT_WIN);
            }
        });

        const offLose = onCodeGolfLose((payload) => {
            if (payload.reason == 'normal') {
                navigate(ROUTES.MATCH_LOSE);
            } else {
                navigate(ROUTES.CODE_GOLF_INSTANT_LOSE);
            }
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

        const offCodeGolfBestScoreUpdate = onCodeGolfBestScoreUpdated((payload) => {
            if (payload.userId !== userId) {
                setIsOpponentSubmitting(false);
                setOpponentBestScore(payload.bestScore);
                setOpponentSubmitStatus('valid');

                if (opponentSubmitTimeout.current) {
                    clearTimeout(opponentSubmitTimeout.current);
                }

                opponentSubmitTimeout.current = setTimeout(() => {
                    setOpponentSubmitStatus(null);
                }, SUBMIT_FEEDBACK_DURATION_MS)
                return;
            }

            setIsSubmitting(false);
            setMyBestScore(payload.bestScore);
            setSubmitStatus('valid');

            if (submitTimeout.current) {
                clearTimeout(submitTimeout.current);
            }

            submitTimeout.current = setTimeout(() => {
                setSubmitStatus(null);
            }, SUBMIT_FEEDBACK_DURATION_MS);

        });

        const offOpponentActivity = onCodeGolfOpponentActivity((payload) => {
                setOpponentCharacterCount(payload.characterCount);
                setIsOpponentTyping(true);

                if (opponentTypingTimeout.current) {
                    clearTimeout(opponentTypingTimeout.current);
                }

                opponentTypingTimeout.current = setTimeout(() => {
                    setIsOpponentTyping(false);
                }, OPPONENT_TYPING_DURATION_MS)
            });

        const offOpponentIsSubmitting = onOpponentIsSubmitting(() => {
            setIsOpponentSubmitting(true);
        });

        const interval = setInterval(() => {
            setRemainingSeconds(Math.max(0, Math.ceil((matchEndsAt - Date.now()) / 1000)));
        }, 1000);

        return () => {
            offCodeGolfWrongSubmit();
            offWin();
            offLose();
            offDraw();
            offError();
            offAborted();
            offCodeGolfBestScoreUpdate();
            offOpponentActivity();
            offOpponentIsSubmitting();
            clearInterval(interval);
            if (submitTimeout.current) {
                clearTimeout(submitTimeout.current);
            }
            if (opponentTypingTimeout.current) {
                clearTimeout(opponentTypingTimeout.current);
            }
        }
    }, [navigate]);

    useEffect(() => {
        if (!isPreparation) return;

        const interval = setInterval(() => {
            const remaining = Math.max(
                0,
                Math.ceil((preparationEndsAt - Date.now()) / 1000)
            );

            setPreparationSeconds(remaining);

            if (remaining === 0) {
                setIsPreparation(false);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function handleSubmit() {
        if (isPreparation || !canBeatBestScore) return;

        setIsSubmitting(true);
        sendCode({ code })
    }

    function handleOnChange(value: string | undefined) {
        const newCode = value ?? '';
        setCode(newCode);

        const now = Date.now();
        if ((now - lastActivitySentAt.current) >= 250) {
            lastActivitySentAt.current = now;

            sendCodeGolfActivity({
                characterCount: newCode.length
            });
        }

        if (activityTimeout.current) {
            clearTimeout(activityTimeout.current);
        }

        activityTimeout.current = setTimeout(() => {
            sendCodeGolfActivity({
                characterCount: newCode.length
            });
        }, 250);

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
                    <div className={s.scoreMessages}>
                        <div>
                            {myMessage && (
                                <div className={s.myMessage}>
                                    {myMessage}
                                </div>
                            )}
                        </div>
                        <div>
                            {opponentMessage && (
                                <div className={s.opponentMessage}>
                                    {opponentMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {isPreparation ? (
                    <div className={s.preparation}>
                        <span className={s.preparationLabel}>
                            PREPARATION
                        </span>

                        <span className={s.preparationTimer}>
                            {preparationSeconds}
                        </span>

                        <span className={s.preparationHint}>
                            Read the task and prepare your strategy
                        </span>
                    </div>
                ) : (
                    <div className={`${s.timer} ${remainingSeconds <= 60 ? s.timerDanger : ''}`}>
                        <span className={s.timerLabel}>TIME LEFT</span>
                        <span className={s.timerValue}>
                            {minutes}:{seconds.toString().padStart(2, '0')}
                        </span>
                    </div>
                    )}
                <header className={s.header}>
                    <div>
                        <span className={s.kicker}>
                            <FontAwesomeIcon icon={faFlagCheckered} />
                            Code Golf · 1v1
                        </span>
                        <h1>{task.name}</h1>
                        <p className={s.description}>{task.description}</p>
                    </div>
                    {!isPreparation && (
                        <div className={`
                                ${s.opponentEditor}
                                ${isOpponentInstantWinZone ? s.opponentInstantWin : ''}
                                ${isOpponentSubmitting ? s.opponentSubmitting : ''}`}>
                            <div className={s.opponentEditorHeader}>
                                <span>
                                    <FontAwesomeIcon icon={faCode} />
                                    Opponent
                                </span>
                                <span className={s.opponentStatus}>
                                    {opponentSubmitStatus === 'invalid' ? (
                                        'FAILED'
                                    ) : opponentSubmitStatus === 'valid' ? (
                                        'NEW BEST'
                                    ) : isOpponentSubmitting ? (
                                        'TESTING...'
                                    ) : isOpponentInstantWinZone ? (
                                        <>
                                            <FontAwesomeIcon icon={faFire} />
                                            INSTANT WIN ZONE
                                        </>
                                    ) : (
                                        'CODING...'
                                    )}
                                </span>
                            </div>
                            <div className={
                                    `${s.fakeCode} 
                                     ${isOpponentTyping ? s.opponentTyping : ''}
                                     ${opponentSubmitStatus === 'invalid' ? s.opponentInvalid : ''}
                                     ${opponentSubmitStatus === 'valid' ? s.opponentValid : ''}`}>
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>
                            <div className={s.opponentStats}>
                                <div>
                                    <span>Current: </span>
                                    <strong>{opponentCharacterCount}</strong>
                                </div>

                                <div>
                                    <span>Best: </span>
                                    <strong>{opponentBestScore}</strong>
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                <div className={
                    `${s.editorSection}
                     ${isSubmitting ? s.submittingEditor : ''}
                     ${submitStatus === 'invalid' ? s.invalidEditor : ''}
                     ${submitStatus === 'valid' ? s.validEditor : ''}
                     ${(isInstantWinZone && submitStatus !== 'invalid') ? s.instantWinEditor : ''}`}
                >

                    {isInstantWinZone && (
                        <div className={s.fireGlow} aria-hidden="true" />
                    )}

                    <div className={s.editorHeader}>
                        <MatchQuickChat onSend={handleSendMessage} />

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
                        onChange={handleOnChange}
                        options={{
                            readOnly: isPreparation,
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

                        <strong className={!canBeatBestScore ? s.overLimitText : undefined}>
                            {characterCount} characters
                        </strong>
                    </div>

                    <div className={s.editorActions}>
                        <SurrenderButton />

                        <button
                            className={`
                            ${s.submitButton}
                            ${isInstantWinZone ? s.instantWinButton : ''}
                        `}
                            disabled={!canBeatBestScore || isPreparation || isSubmitting}
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
                </div>
            </section>
        </main>
    );
}
