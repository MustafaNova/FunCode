import { useState } from 'react';
import s from './surrenderButton.module.scss';
import { createPortal } from 'react-dom';
import { surrenderMatch } from '../../services/socket/gameSocket.ts';


export function SurrenderButton() {
    const [isOpen, setIsOpen] = useState(false);

    function onSurrender() {
        surrenderMatch();
    }

    return (
        <>
            <button type="button"  className={s.surrenderButton} onClick={() => setIsOpen(true)}>
                Surrender
            </button>

            {isOpen && createPortal(
                <div className={s.overlay}>
                    <div
                        className={s.modal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="surrender-title"
                    >
                        <h2 id="surrender-title">Surrender Match?</h2>
                        <p>Are you sure? This will count as a loss.</p>

                        <div className={s.actions}>
                            <button
                                type="button"
                                className={s.cancelButton}
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={s.confirmButton}
                                onClick={() => {
                                    setIsOpen(false);
                                    onSurrender();
                                }}
                            >
                                Surrender
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
