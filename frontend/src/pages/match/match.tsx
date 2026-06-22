import s from './match.module.scss'
import { useMatchStore } from '../../store/matchStore.ts';
import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { onError, onLose, onWin, onWrongSubmit, sendCode } from '../../services/socket/gameSocket.ts';
import type { SubmitReq, SubmitResponse } from '@funcode/shared';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCode, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export function Match() {
    const navigate = useNavigate();
    const matchTask = useMatchStore((s) => s.matchTask);
    const [code, setCode] = useState('');
    const [submitResponse, setSubmitResponse] = useState<SubmitResponse | null>(null);

    useEffect(() => {
        const offWrong = onWrongSubmit((res) => {
            setSubmitResponse(res);
        })

        const offError = onError((res) => {
            setSubmitResponse(res);
        })

        const offWin = onWin(() => {
            navigate('win');
        })

        const offLose = onLose(() => {
            navigate('lose');
        })

        return () => {
            offWrong();
            offWin();
            offLose();
            offError();
        }
    }, [navigate])

    function submitCode() {
        if (code.trim() === '' || matchTask?.id == null) return;
        const submitReq: SubmitReq = {
            taskId: matchTask.id,
            solution: code
        }
        sendCode(submitReq);
    }

    return (
        <main className={s.matchScreen}>
            <section className={s.matchShell}>
                <aside className={s.taskCard}>
                    <div className={s.taskHeader}>
                        <p className={s.kicker}>Live duel</p>
                        <h2 className={s.taskTitle}>{matchTask?.name}</h2>
                        <span className={s.difficultyBadge}>{matchTask?.difficulty}</span>
                    </div>

                    <div className={s.taskContent}>
                        <div className={s.taskSection}>
                            <h3>Description</h3>
                            <p>{matchTask?.description}</p>
                        </div>

                        <div className={s.taskSection}>
                            <h3>Examples</h3>
                            <pre className={s.taskCode}>
                                {matchTask?.examples?.join('\n\n')}
                            </pre>
                        </div>

                        <div className={s.taskSection}>
                            <h3>Constraints</h3>
                            <p>{matchTask?.constraints}</p>
                        </div>
                    </div>
                </aside>

                <section className={s.codePanel}>
                    <div className={s.editorToolbar}>
                        <div className={s.editorTitle}>
                            <FontAwesomeIcon icon={faCode} />
                            <span>JavaScript</span>
                        </div>

                        <button className={s.submitBtn} onClick={submitCode}>
                            <FontAwesomeIcon icon={faBolt} />
                            Submit
                        </button>
                    </div>

                    <div className={s.feedbackArea}>
                        {submitResponse?.type == 'wrong' && (
                            <span className={s.feedbackMessage}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                {submitResponse.playerName} had a failed submit
                            </span>
                        )}

                        {submitResponse?.type == 'error' && (
                            <span className={s.feedbackMessage}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                {submitResponse.message}
                            </span>
                        )}
                    </div>

                    <div className={s.editorFrame}>
                        <Editor
                            value={matchTask?.starterCode}
                            onChange={(userCode) => setCode(userCode ?? '')}
                            height="100%"
                            language="javascript"
                            theme="vs-dark"
                        />
                    </div>
                </section>
            </section>
        </main>
    )
}
