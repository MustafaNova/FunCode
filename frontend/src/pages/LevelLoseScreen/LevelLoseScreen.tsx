import s from './levelLose.module.scss'
import { useBackToHome } from '../../utils/hooks.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faXmark } from '@fortawesome/free-solid-svg-icons';

export function LevelLoseScreen() {
    return (
        <main className={s.screen}>
            <section className={s.resultPanel}>
                <div className={s.effectLayer} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>

                <div className={s.resultIcon}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>

                <div className={s.resultContent}>
                    <p className={s.kicker}>Level failed</p>
                    <h1>Failed</h1>
                    <p>Try the challenge again from the hub.</p>
                </div>

                <button className={s.actionButton} onClick={useBackToHome()}>
                    <FontAwesomeIcon icon={faHouse} />
                    Go back
                </button>
            </section>
        </main>
    )
}
