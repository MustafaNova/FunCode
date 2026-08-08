import { useParams } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import s from './bugHunter.module.scss';
import { BUG_HUNTER_LEVELS_BY_ID } from './bugHunterLevels.ts';
import { useEffect, useState } from 'react';
import { getBugHunterLevel } from '../../../../services/practice.ts';
import type { GetBugHunterLevelContentRes } from '@funcode/shared';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal.tsx';


export function BugHunterLevel() {
    const { levelId } = useParams<{ levelId: string }>();
    const [levelContent, setLevelContent] = useState<GetBugHunterLevelContentRes | null>(null);
    const editorOptions = {
        automaticLayout: true,
        minimap: {
            enabled: false,
        },
        fontSize: 15,
        scrollBeyondLastLine: false,
        tabSize: 4,
        padding: {
            top: 16,
        },
    };

    useEffect(() => {
        async function getLevelContent() {
            if (!levelId) return;
            const res = await getBugHunterLevel(levelId);
            setLevelContent(res);
        }
        void getLevelContent();
    }, []);

    if (!levelId) {
        return <div>Error</div>
    }

    if (levelContent === null) {
        return <div className={s.txt}>...loading</div>
    }

    const level = BUG_HUNTER_LEVELS_BY_ID[levelId];

    return (
        <main className={s.page}>
            <section className={s.challengeHeader}>
                <span className={s.eyebrow}>Bug Hunter</span>

                <h1 className={s.title}>
                    {level.name}
                </h1>

                <p className={s.description}>{levelContent.description}</p>

                <div className={s.meta}>
                    <span>Level {level.level}</span>
                    <span>{levelContent.language}</span>
                </div>
            </section>

            <section className={s.editorSection}>
                <div className={s.editorHeader}>
                    <div>
                        <h2 className={s.editorTitle}>Code Editor</h2>

                        <p className={s.editorHint}>
                            Edit the existing code without changing the function
                            signature.
                        </p>
                    </div>
                </div>

                <div className={s.editorWrapper}>
                    <Editor
                        height="520px"
                        language={levelContent.language}
                        theme="vs-dark"
                        options={editorOptions}
                        value={levelContent.initialCode}
                    />
                </div>

                <div className={s.actions}>
                    <button className={s.runButton} type="button">
                        Run tests
                    </button>
                </div>
            </section>
        </main>
    )
}