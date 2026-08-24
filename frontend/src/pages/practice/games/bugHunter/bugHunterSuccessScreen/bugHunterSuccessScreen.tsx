import s from './bugHunterSuccess.module.scss';
import { useNavigate } from 'react-router-dom';

export function BugHunterSuccessScreen() {
    const navigate = useNavigate();
    return (
        <div className={s.wrapper}>
            <div className={s.card}>
                <div className={s.icon}>✓</div>

                <h1 className={s.title}>Bug Fixed!</h1>

                <p className={s.description}>
                    Nice work! You found and fixed the bug successfully.
                </p>

                <div className={s.reward}>
                    <span>Level completed</span>
                    <span className={s.xp}>+100 XP</span>
                </div>

                <button className={s.continueButton} onClick={() => navigate('/practice/bug-hunter')}>
                    Continue
                </button>
            </div>
        </div>
    );
}