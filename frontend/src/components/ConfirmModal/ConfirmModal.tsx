import s from './ConfirmModal.module.scss';

type ConfirmModalProps = {
    isOpen: boolean;
    title: string;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmModal({
        isOpen,
        title,
        text,
        onConfirm,
        onCancel,
    }: ConfirmModalProps
) {
    if (!isOpen) {
        return;
    }

    return <div className={s.levelFrameOverlay}>
        <div className={s.levelFrameModal}>
            <h3 className={s.levelFrameModalTitle}>{title}</h3>

            <p className={s.levelFrameModalText}>{text}</p>

            <div className={s.levelFrameModalActions}>
                <button
                    className={`${s.levelFrameModalBtn} ${s.levelFrameModalBtnCancel}`}
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    className={`${s.levelFrameModalBtn} ${s.levelFrameModalBtnLeave}`}
                    onClick={onConfirm}
                >
                    Leave
                </button>
            </div>
        </div>
    </div>
}