import s from './match.module.scss'
import { useMatchStore } from '../../store/matchStore.ts';
import { Editor } from '@monaco-editor/react';

export function Match() {
    const matchTask = useMatchStore((s) => s.matchTask);
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
            <button className={s.submitBtn}>submit</button>
            <Editor value={matchTask?.starterCode}  height={'300px'} language={'JavaScript'} theme={'vs-dark'}/>
        </div>
    )
}
