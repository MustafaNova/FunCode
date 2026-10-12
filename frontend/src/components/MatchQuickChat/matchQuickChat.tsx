import { useState } from 'react';
import s from './matchQuickChat.module.scss';
import { QUICK_MESSAGES, type QuickMessage } from '@funcode/shared';

type MatchQuickChatProps = {
    onSend: (message: QuickMessage) => void;
};

export function MatchQuickChat({ onSend }: MatchQuickChatProps) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSend(message: QuickMessage) {
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
