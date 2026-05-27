import s from './lose.module.scss';
import { useBackToHome } from '../../../utils/hooks.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export function MatchLose() {
    const loseMsg = 'Opponent deployed their solution first!';
    return (
        <main className={s.readyScreen}>
            <section className={s.resultPanel}>
                <div className={s.effectLayer} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>

                <div className={s.resultIcon}>
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                </div>

                <div className={s.resultContent}>
                    <p className={s.kicker}>Match complete</p>
                    <h1>Defeat</h1>
                    <p>{loseMsg}</p>
                </div>

                <button className={s.leaveButton} onClick={useBackToHome()}>
                    <FontAwesomeIcon icon={faHouse} />
                    Leave
                </button>
            </section>
        </main>
    )
}
