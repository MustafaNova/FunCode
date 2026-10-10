import s from './classicMatch.module.scss'
import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { onError, onLose, onWin, onWrongSubmit, sendCode } from '../../../../services/socket/gameSocket.ts';
import type { ClassicBattleStartedPayload, SubmitResponse } from '@funcode/shared';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../../../constants/routes.ts';
import { useMatchMessages } from '../../../../hooks/useMatchMessages.ts';
import { MatchQuickChat } from '../../../../components/MatchQuickChat/matchQuickChat.tsx';
import { MatchMessages } from '../../../../components/MatchMessages/matchMessages.tsx';
import { SurrenderButton } from '../../../../components/SurrenderButton/surrenderButton.tsx';

export function ClassicMatch() {
    const navigate = useNavigate();
    const location = useLocation();
    const { myMessage, opponentMessage, handleSendMessage } = useMatchMessages();
    const { task } = location.state as ClassicBattleStartedPayload;
    const [code, setCode] = useState(task.starterCode);
    const [submitResponse, setSubmitResponse] = useState<SubmitResponse | null>(null);

    useEffect(() => {
        const offWrong = onWrongSubmit((res) => {
            setSubmitResponse(res);
        })

        const offError = onError((res) => {
            console.log(res);
        })

        const offWin = onWin(() => {
            navigate(ROUTES.MATCH_WIN);
        })

        const offLose = onLose(() => {
            navigate(ROUTES.MATCH_LOSE);
        })

        return () => {
            offWrong();
            offWin();
            offLose();
            offError();
        }
    }, [navigate])

    function submitCode() {
        sendCode({ code });
    }

    return (
        <main className={s.matchScreen}>
            <section className={s.matchShell}>
                <aside className={s.taskCard}>
                    <div className={s.taskHeader}>
                        <p className={s.kicker}>Live duel</p>
                        <h2 className={s.taskTitle}>{task.name}</h2>
                    </div>

                    <div className={s.taskContent}>
                        <div className={s.taskSection}>
                            <h3>Description</h3>
                            <p>{task.description}</p>
                        </div>

                        <div className={s.taskSection}>
                            <h3>Examples</h3>
                            <pre className={s.taskCode}>
                                {task.examples?.join('\n\n')}
                            </pre>
                        </div>

                        <div className={s.taskSection}>
                            <h3>Constraints</h3>
                            <p>{task.constraints}</p>
                        </div>
                    </div>
                </aside>

                <section className={s.codePanel}>
                    <div className={s.editorToolbar}>
                        <div className={s.editorTitle}>
                            <MatchQuickChat onSend={handleSendMessage} />
                        </div>

                        <div className={s.editorActions}>
                            <SurrenderButton />
                            <button className={s.submitBtn} onClick={submitCode}>
                                <FontAwesomeIcon icon={faBolt} />
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className={s.feedbackArea}>
                        <MatchMessages
                            myMessage={myMessage}
                            opponentMessage={opponentMessage}
                        />
                        {submitResponse && (
                            <span className={s.feedbackMessage}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                {submitResponse.playerName} had a failed submit
                            </span>
                        )}
                    </div>

                    <div className={s.editorFrame}>
                        <Editor
                            value={code}
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
