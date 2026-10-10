import { useEffect, useRef, useState } from 'react';
import type { QuickMessage } from '@funcode/shared';
import {
    sendMatchMessage,
    onOpponentMatchMessage,
} from '../services/socket/gameSocket';

const MESSAGE_DURATION_MS = 3000;

export function useMatchMessages() {
    const [myMessage, setMyMessage] = useState<QuickMessage | null>(null);
    const [opponentMessage, setOpponentMessage] = useState<QuickMessage | null>(null);

    const myTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const opponentTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleSendMessage(message: QuickMessage) {
        sendMatchMessage({ message });
        setMyMessage(message);

        if (myTimeout.current) {
            clearTimeout(myTimeout.current);
        }

        myTimeout.current = setTimeout(() => {
            setMyMessage(null);
        }, MESSAGE_DURATION_MS);
    }

    useEffect(() => {
        const unsubscribe = onOpponentMatchMessage(({ message }) => {
            setOpponentMessage(message);

            if (opponentTimeout.current) {
                clearTimeout(opponentTimeout.current);
            }

            opponentTimeout.current = setTimeout(() => {
                setOpponentMessage(null);
            }, MESSAGE_DURATION_MS);
        });

        return () => {
            unsubscribe();

            if (myTimeout.current) clearTimeout(myTimeout.current);
            if (opponentTimeout.current) clearTimeout(opponentTimeout.current);
        };
    }, []);

    return {
        myMessage,
        opponentMessage,
        handleSendMessage,
    };
}