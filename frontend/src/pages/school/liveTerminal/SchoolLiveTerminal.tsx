import { useEffect, useMemo, useRef, useState } from 'react';
import s from './schoolLiveTerminal.module.scss';
import { buildPreviewDocument } from './buildPreviewDocument.tsx';
import { HTML_SNIPPETS } from './htmlSnippets.ts';


export function SchoolLiveTerminal() {
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [renderedCode, setRenderedCode] = useState('');

    const currentSnippet = HTML_SNIPPETS[snippetIndex] ?? '';
    const atStart = charIndex === 0;
    const atEnd = charIndex === currentSnippet.length;

    useEffect(() => {
        const delay = isDeleting ? 14 : atEnd ? 1200 : 26;
        const timeoutId = window.setTimeout(() => {
            if (!isDeleting && atEnd) {
                setIsDeleting(true);
                return;
            }

            if (isDeleting && atStart) {
                setIsDeleting(false);
                setSnippetIndex((index) => (index + 1) % HTML_SNIPPETS.length);
                return;
            }

            setCharIndex((index) => index + (isDeleting ? -1 : 1));
        }, delay);

        return () => window.clearTimeout(timeoutId);
    }, [atEnd, atStart, charIndex, isDeleting]);

    const typedCode = currentSnippet.slice(0, charIndex);
    const latestCodeRef = useRef(typedCode);

    useEffect(() => {
        latestCodeRef.current = typedCode;
    }, [typedCode]);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setRenderedCode((current) => {
                const next = latestCodeRef.current;
                return current === next ? current : next;
            });
        }, 260);

        return () => window.clearInterval(intervalId);
    }, []);

    const previewDocument = useMemo(() => buildPreviewDocument(renderedCode), [renderedCode]);

    return (
        <div className={s.liveTerminal}>
            <div className={s.editorPane}>
                <div className={s.paneHeader}>live-editor</div>
                <pre className={s.code}>
                    <code>{typedCode}</code>
                    <span className={s.cursor}>|</span>
                </pre>
            </div>

            <div className={s.previewPane}>
                <div className={s.paneHeader}>output</div>
                <iframe
                    className={s.previewFrame}
                    sandbox=""
                    srcDoc={previewDocument}
                    title="Live HTML output preview"
                />
            </div>
        </div>
    );
}
