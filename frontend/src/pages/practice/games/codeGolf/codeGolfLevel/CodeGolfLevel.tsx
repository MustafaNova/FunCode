import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import s from './codeGolfLevel.module.scss';
import { ConfirmModal } from '../../../../../components/ConfirmModal/ConfirmModal.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { getPracticeLevel, submitCodeGolfSolution } from '../../../../../services/practice.ts';
import type { CodeGolfLevelRes } from '@funcode/shared';

export function CodeGolfLevel() {
    const { levelId } = useParams<{ levelId: string }>();
    const [code, setCode] = useState('');
    const [levelContent, setLevelContent] = useState<CodeGolfLevelRes | null>(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const modalTitle = 'Leave?';
    const modalText = 'Your progress will be lost';
    const editorOptions = {
        automaticLayout: true,
        minimap: {
            enabled: false,
        },
        fontSize: 15,
        scrollBeyondLastLine: false,
        padding: {
            top: 16,
        },
    }
    const characterCount = code.length;

    useEffect(() => {
        async function getLevelContent() {
            if (!levelId) return;
            const res = await getPracticeLevel('code-golf', levelId);
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

    async function submitSolution() {
        if (!levelId) return;
        await submitCodeGolfSolution(levelId, { code });
    }


    return (
        <main className={s.page}>
            <header className={s.header}>
                <div>
                    <span className={s.eyebrow}>Code Golf</span>
                    <h1 className={s.title}>Ocean Breeze</h1>
                    <p className={s.description}>{levelContent.description}</p>
                </div>

                <button
                    className={s.leaveButton}
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Leave
                </button>
            </header>

            <section className={s.editorSection}>
                <div className={s.editorHeader}>
                    <div>
                        <h2>Code Editor</h2>
                        <span>{levelContent.language}</span>
                    </div>

                    <div className={s.limitBox}>
                        <span className={s.limitLabel}>Character limit</span>
                        <strong className={s.limitValue}>
                            {levelContent.maxCharacters}
                        </strong>
                    </div>
                </div>

                <div className={s.editorWrapper}>
                    <Editor
                        height="520px"
                        language={levelContent.language}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value ?? '')}
                        options={editorOptions}
                    />
                </div>

                <div className={s.footer}>
                    <span className={`${s.characterCount} ${characterCount <= levelContent.maxCharacters ? s.green : s.red}`}>
                        {characterCount} characters
                    </span>

                    <button
                        type="button"
                        className={s.submitButton}
                        disabled={characterCount > levelContent.maxCharacters}
                        onClick={submitSolution}
                    >
                        Submit solution
                    </button>
                </div>
            </section>
            <ConfirmModal isOpen={showModal} title={modalTitle} text={modalText} onConfirm={() => navigate(-1)} onCancel={() => setShowModal(false)} />
        </main>
    );
}
