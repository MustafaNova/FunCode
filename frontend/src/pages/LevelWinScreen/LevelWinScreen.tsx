import s from './levelWinScreen.module.scss'
import { useBackToHome } from '../../utils/hooks.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHouse } from '@fortawesome/free-solid-svg-icons';

export function LevelWinScreen() {
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

                <button className={s.actionButton} onClick={useBackToHome()}>
                    <FontAwesomeIcon icon={faHouse} />
                    Go back
                </button>
            </section>
        </main>
    )
}
