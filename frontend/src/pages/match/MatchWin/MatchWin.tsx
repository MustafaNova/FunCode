import s from './win.module.scss';
import { useBackToHome } from '../../../utils/hooks.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrophy } from '@fortawesome/free-solid-svg-icons';

export function MatchWin() {
    const winMsg = 'Victory compiled successfully!'
    const backToHome = useBackToHome();
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

                <button className={s.leaveButton} onClick={backToHome}>
                    <FontAwesomeIcon icon={faHouse} />
                    Leave
                </button>
            </section>
        </main>
    )
}
