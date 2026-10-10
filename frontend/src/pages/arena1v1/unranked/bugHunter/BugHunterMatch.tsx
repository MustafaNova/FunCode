import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import s from './bugHunterMatch.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import type { BugHunterBattleStartedPayload, SubmitResponse } from '@funcode/shared';
import { onError, onLose, onWin, onWrongSubmit, sendCode } from '../../../../services/socket/gameSocket.ts';
import { ROUTES } from '../../../../constants/routes.ts';
import { MatchQuickChat } from '../../../../components/MatchQuickChat/matchQuickChat.tsx';
import { useMatchMessages } from '../../../../hooks/useMatchMessages.ts';
import { MatchMessages } from '../../../../components/MatchMessages/matchMessages.tsx';
import { SurrenderButton } from '../../../../components/SurrenderButton/surrenderButton.tsx';

export function BugHunterMatch() {
    const navigate = useNavigate();
    const { myMessage, opponentMessage, handleSendMessage } = useMatchMessages();
    const [submitResponse, setSubmitResponse] = useState<SubmitResponse | null>(null);
    const location = useLocation();
    const { task } = location.state as BugHunterBattleStartedPayload;
    const [code, setCode] = useState(task.code);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const offWrong = onWrongSubmit((res) => {
            setSubmitResponse(res);

            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setSubmitResponse(null);
            }, 2000);
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
            clearTimeout(timeoutId);
            offWrong();
            offWin();
            offLose();
            offError();
        }
    }, [navigate])

    function handleSubmit() {
        sendCode({ code })
    }

    return (
        <main className={`${s.container} galaxyGridBackground`}>
            <section className={s.matchPanel}>
                <MatchMessages myMessage={myMessage} opponentMessage={opponentMessage} />
                <header className={s.header}>
                    <div>

                        <h1>{task.name}</h1>

                        <p>
                            {task.description}
                        </p>
                    </div>

                    {submitResponse && (
                        <span className={s.feedbackMessage}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            {submitResponse.playerName} had a failed submit
                            </span>
                    )}

                </header>
                <div className={s.editorSection}>
                    <div className={s.editorHeader}>
                        <MatchQuickChat onSend={handleSendMessage} />
                        <div className={s.editorActions}>
                            <SurrenderButton />
                            <button className={s.submitButton} onClick={handleSubmit}>
                                Submit Fix
                            </button>
                        </div>
                    </div>

                    <Editor
                        height="520px"
                        language="typescript"
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
            </section>
        </main>
    );
}
