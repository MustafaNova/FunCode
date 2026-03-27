import s from './match.module.scss'
import { useMatchStore } from '../../store/matchStore.ts';
import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { onWrongSubmit, sendCode } from '../../services/socket.ts';

export function Match() {
    const matchTask = useMatchStore((s) => s.matchTask);
    const [code, setCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        return onWrongSubmit((msg) => {
            console.log(msg);
            setErrorMsg(msg);
        })
    }, [])

    function submitCode() {
        if (code.trim() === '' || matchTask?.id == null) return;
        console.log(matchTask.id)
        sendCode(matchTask.id, code);
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
            <button className={s.submitBtn} onClick={() => submitCode()}>submit</button>
            <Editor value={matchTask?.starterCode} onChange={(userCode) => setCode(userCode ?? '')}  height={'300px'} language={'JavaScript'} theme={'vs-dark'}/>
        </div>
    )
}
