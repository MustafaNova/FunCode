import { useEffect, useState } from 'react';

export function useTypingCode(snippets: string[]) {
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const currentSnippet = snippets[snippetIndex] ?? '';
    const isAtEnd = charIndex === currentSnippet.length;
    const isAtStart = charIndex === 0;

    useEffect(() => {
        const delay = isDeleting ? 26 : isAtEnd ? 1200 : 42;

        const timeoutId = window.setTimeout(() => {
            if (!isDeleting && isAtEnd) {
                setIsDeleting(true);
                return;
            }

            if (isDeleting && isAtStart) {
                setIsDeleting(false);
                setSnippetIndex((index) => (index + 1) % snippets.length);
                return;
            }

            setCharIndex((index) => index + (isDeleting ? -1 : 1));
        }, delay);

        return () => window.clearTimeout(timeoutId);
    }, [charIndex, isAtEnd, isAtStart, isDeleting, snippets.length]);

    return currentSnippet.slice(0, charIndex);
}
