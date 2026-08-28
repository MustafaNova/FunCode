import Editor from '@monaco-editor/react';
import { useState } from 'react';
import s from './codeGolfLevel.module.scss';
import { ConfirmModal } from '../../../../../components/ConfirmModal/ConfirmModal.tsx';
import { useNavigate } from 'react-router-dom';

export function CodeGolfLevel() {
    const [code, setCode] = useState(`function sum(a: number, b: number) {
    return a + b;}`);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const modalTitle = 'Leave?';
    const modalText = 'Your progress will be lost';

    const characterCount = code.length;

    return (
        <main className={s.page}>
            <header className={s.header}>
                <div>
                    <span className={s.eyebrow}>Code Golf</span>
                    <h1 className={s.title}>Ocean Breeze</h1>
                    <p className={s.description}>
                        Solve the challenge with the shortest correct code possible.
                        Every character counts.
                    </p>
                </div>

                <button
                    className={s.leaveButton}
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Leave
                </button>
            </header>

            <section className={s.challengeBox}>
                <span className={s.challengeLabel}>Challenge</span>
                <p>
                    Write a function that returns the sum of two numbers.
                    Keep your solution as short as possible.
                </p>
            </section>

            <section className={s.editorSection}>
                <div className={s.editorHeader}>
                    <div>
                        <h2>Code Editor</h2>
                        <span>TypeScript</span>
                    </div>
                </div>

                <div className={s.editorWrapper}>
                    <Editor
                        height="520px"
                        language="typescript"
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value ?? '')}
                        options={{
                            automaticLayout: true,
                            minimap: {
                                enabled: false,
                            },
                            fontSize: 15,
                            scrollBeyondLastLine: false,
                            padding: {
                                top: 16,
                            },
                        }}
                    />
                </div>

                <div className={s.footer}>
                    <span className={s.characterCount}>
                        {characterCount} characters
                    </span>

                    <button
                        type="button"
                        className={s.submitButton}
                    >
                        Submit solution
                    </button>
                </div>
            </section>
            <ConfirmModal isOpen={showModal} title={modalTitle} text={modalText} onConfirm={() => navigate(-1)} onCancel={() => setShowModal(false)} />
        </main>
    );
}