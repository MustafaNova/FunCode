import s from './match.module.scss'
import { useMatchStore } from '../../store/matchStore.ts';
import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { onLose, onWin, onWrongSubmit, sendCode } from '../../services/socket.ts';
import type { SubmitReq, SubmitRes } from '../../../../shared/src';
import { useNavigate } from 'react-router-dom';

export function Match() {
    const navigate = useNavigate();
    const matchTask = useMatchStore((s) => s.matchTask);
    const [code, setCode] = useState('');
    const [submitResponse, setSubmitResponse] = useState<SubmitRes | null>(null);

    useEffect(() => {
        const offWrong = onWrongSubmit((res) => {
            setSubmitResponse(res);
        })

        const offWin = onWin((res) => {
            console.log('won');
            navigate('win');
        })

        const offLose = onLose((res) => {
            console.log('failed');
            navigate('lose');
        })

        return () => {
            offWrong();
            offWin();
            offLose();
        }
    }, [])

    function submitCode() {
        if (code.trim() === '' || matchTask?.id == null) return;
        const submitReq: SubmitReq = {
            taskId: matchTask.id,
            solution: code
        }
        sendCode(submitReq);
    }

    return (
        <div className={s.matchScreen}>
            <div className={s.taskCard}>
                <div className={s.taskHeader}>
                    <h2 className={s.taskTitle}>
                        {matchTask?.name}
                        ({matchTask?.difficulty})
                    </h2>
                </div>
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
            <div>
                <button className={s.submitBtn} onClick={submitCode}>submit</button>
                <div>{submitResponse && <span>{submitResponse.playerName}: {submitResponse.status}</span>}</div>
            </div>
            <Editor value={matchTask?.starterCode} onChange={(userCode) => setCode(userCode ?? '')}  height={'300px'} language={'JavaScript'} theme={'vs-dark'}/>
        </div>
    )
}
