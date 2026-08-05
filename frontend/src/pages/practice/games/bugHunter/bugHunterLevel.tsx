import { useParams } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import s from './bugHunter.module.scss';
import { BUG_HUNTER_LEVELS_BY_ID } from './bugHunterLevels.ts';


export function BugHunterLevel() {
    const { levelId } = useParams<{ levelId: string }>();
    const level = BUG_HUNTER_LEVELS_BY_ID[levelId!];
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

    return (
        <main className={s.page}>
            <section className={s.challengeHeader}>
                <span className={s.eyebrow}>Bug Hunter</span>

                <h1 className={s.title}>
                    {level.name}
                </h1>

                <p className={s.description}>
                    The login function grants access incorrectly. Find the hidden
                    bug, fix the code, and run the tests.
                </p>

                <div className={s.meta}>
                    <span>Level {level.level}</span>
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

                    <button
                        className={s.resetButton}
                        type="button">
                        Reset
                    </button>
                </div>

                <div className={s.editorWrapper}>
                    <Editor
                        height="520px"
                        language="typescript"
                        theme="vs-dark"
                        options={editorOptions}
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