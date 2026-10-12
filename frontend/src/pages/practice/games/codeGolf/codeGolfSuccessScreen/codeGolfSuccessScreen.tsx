import { useNavigate } from 'react-router-dom';
import s from './codeGolfSuccessScreen.module.scss';

export function CodeGolfSuccessScreen() {
    const navigate = useNavigate();

    return (
        <div className={s.page}>
            <div className={s.card}>
                <div className={s.badge}>✓</div>

                <p className={s.eyebrow}>Code Golf</p>

                <h1 className={s.title}>
                    Level completed
                </h1>

                <p className={s.description}>
                    Your solution passed all tests and stayed within the
                    character limit.
                </p>

                <div className={s.actions}>
                    <button
                        className={s.primaryButton}
                        onClick={() => navigate('/practice/code-golf')}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}