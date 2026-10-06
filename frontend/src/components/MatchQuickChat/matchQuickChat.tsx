import { useState } from 'react';
import s from './matchQuickChat.module.scss';

const QUICK_MESSAGES = [
    'Good luck!',
    'Nice!',
    'So close!',
    'Wow!',
    'GG!',
] as const;

type MatchQuickChatProps = {
    onSend: (message: string) => void;
};

export function MatchQuickChat({ onSend }: MatchQuickChatProps) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSend(message: string) {
        onSend(message);
        setIsOpen(false);
    }

    return (
        <div className={s.quickChat}>
            <button
                className={s.toggleButton}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Chat
            </button>

            {isOpen && (
                <div className={s.messageMenu}>
                    {QUICK_MESSAGES.map((message) => (
                        <button
                            key={message}
                            className={s.messageButton}
                            onClick={() => handleSend(message)}
                        >
                            {message}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}