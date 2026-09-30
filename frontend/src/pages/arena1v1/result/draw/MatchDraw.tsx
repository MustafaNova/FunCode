import s from './matchDraw.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faScaleBalanced,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes.ts';

export function MatchDraw() {
    const navigate = useNavigate();
    const drawMsg = 'Both players finished with the same score.';

    return (
        <main className={s.drawScreen}>
            <section className={s.resultPanel}>
                <div
                    className={s.effectLayer}
                    aria-hidden="true"
                >
                    <span />
                    <span />
                    <span />
                </div>

                <div className={s.resultIcon}>
                    <FontAwesomeIcon icon={faScaleBalanced} />
                </div>

                <div className={s.resultContent}>
                    <p className={s.kicker}>Match complete</p>
                    <h1>Draw</h1>
                    <p>{drawMsg}</p>
                </div>

                <button
                    className={s.leaveButton}
                    onClick={() => navigate(ROUTES.HOME)}
                >
                    <FontAwesomeIcon icon={faHouse} />
                    Leave
                </button>
            </section>
        </main>
    );
}