import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFire,
    faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import s from './codeGolf.instant.lose.module.scss';

export function CodeGolfInstantLose() {
    const navigate = useNavigate();

    return (
        <div className={s.container}>
            <div className={s.card}>
                <div className={s.iconWrapper}>
                    <FontAwesomeIcon
                        icon={faFire}
                        className={s.icon}
                    />
                </div>

                <span className={s.eyebrow}>
                    CODE GOLF
                </span>

                <h1>Instant Loss</h1>

                <p className={s.description}>
                    Your opponent reached the instant win target
                    and ended the match early.
                </p>

                <div className={s.actions}>
                    <button
                        className={s.secondaryButton}
                        onClick={() => navigate('/home/arena')}
                    >
                        <FontAwesomeIcon icon={faHouse} />
                        Back to Arena
                    </button>
                </div>
            </div>
        </div>
    );
}
