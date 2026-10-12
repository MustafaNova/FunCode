import s from './matchWin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes.ts';

export function MatchWin() {
    const navigate = useNavigate();
    const winMsg = 'Victory compiled successfully!'
    return (
        <main className={s.readyScreen}>
            <section className={s.resultPanel}>
                <div className={s.effectLayer} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>

                <div className={s.resultIcon}>
                    <FontAwesomeIcon icon={faTrophy} />
                </div>

                <div className={s.resultContent}>
                    <p className={s.kicker}>Match complete</p>
                    <h1>Victory</h1>
                    <p>{winMsg}</p>
                </div>

                <button className={s.leaveButton} onClick={() => navigate(ROUTES.HOME)}>
                    <FontAwesomeIcon icon={faHouse} />
                    Leave
                </button>
            </section>
        </main>
    )
}
