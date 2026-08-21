import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import s from './bugHunter.module.scss';
import { BUG_HUNTER_LEVELS_BY_ID } from './bugHunterLevels.ts';
import { useEffect, useState } from 'react';
import { getBugHunterLevel, submitBugHunterSolution } from '../../../../services/practice.ts';
import type { GetBugHunterLevelContentRes } from '@funcode/shared';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal.tsx';


export function BugHunterLevel() {
    const { levelId } = useParams<{ levelId: string }>();
    const [levelContent, setLevelContent] = useState<GetBugHunterLevelContentRes | null>(null);
    const [code, setCode] = useState<string>('');
    const editorOptions = {
        automaticLayout: true,
        minimap: {
            enabled: false,
        },
        fontSize: 15,
        scrollBeyondLastLine: false,
        tabSize: 4,
        insertSpaces: true,
        padding: {
            top: 16,
        },
    };
    const [showModal, setShowModal] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const navigate = useNavigate();
    const modalTitle = 'Leave level?';
    const modalText = 'Your progress will be lost';
    const errorDisplayDuration = 3000;

    useEffect(() => {
        async function getLevelContent() {
            if (!levelId) return;
            const res = await getBugHunterLevel(levelId);
            setLevelContent(res);
            setCode(res.initialCode);
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

    async function submitSolution() {
        if (!levelId) return;
        const res = await submitBugHunterSolution(levelId, { code })

        if (!res.success) {
            setSubmitError(true);

            setTimeout(() => {
                setSubmitError(false);
            }, errorDisplayDuration)

            return;
        }

        navigate('success')

    }

    return (
        <main className={s.page}>
            <section className={s.challengeHeader}>
                <div className={s.challengeHeaderTop}>
                    <span className={s.eyebrow}>Bug Hunter</span>

                    <button
                        className={s.leaveButton}
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                        Leave
                    </button>
                </div>

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
                        value={code}
                        onChange={(value) => setCode(value ?? '') }
                    />
                </div>

                <div className={s.actions}>
                    {submitError && <span className={s.failedMsg}>Your solution is incorrect</span>}
                    <button className={s.runButton} onClick={submitSolution} type="button">
                        submit
                    </button>
                </div>
            </section>
            <ConfirmModal isOpen={showModal} title={modalTitle} text={modalText} onConfirm={() => navigate(-1)} onCancel={() => setShowModal(false)} />
        </main>
    )
}