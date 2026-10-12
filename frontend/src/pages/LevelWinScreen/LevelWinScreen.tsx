import s from './levelWinScreen.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.ts';

export function LevelWinScreen() {
    const navigate = useNavigate();
    return (
        <main className={s.screen}>
            <section className={s.resultPanel}>
                <div className={s.effectLayer} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                </div>

                <div className={s.resultIcon}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>

                <div className={s.resultContent}>
                    <p className={s.kicker}>Level complete</p>
                    <h1>Completed</h1>
                    <p>You cleared this challenge.</p>
                </div>

                <button className={s.actionButton} onClick={() => navigate(ROUTES.HOME)}>
                    <FontAwesomeIcon icon={faHouse} />
                    Go back
                </button>
            </section>
        </main>
    )
}
