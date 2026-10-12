import s from './arena1v1.module.scss'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGamepad,
    faLock,
    faTrophy,
    faUserNinja,
} from '@fortawesome/free-solid-svg-icons';

export function Arena1v1() {
    const navigate = useNavigate();

    return (
        <main className="galaxyGridBackground">
            <section className={s.panel}>
                <div className={s.terminal}>
                    <div className={s.terminalHeader}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className={s.codeLines}>
                        <span className={s.prompt}>funcode@arena:~$</span>
                        <span>queue_1v1_mode()</span>
                        <span className={s.cursor}>_</span>
                    </div>
                </div>

                <div className={s.hero}>
                    <p className={s.kicker}>1v1 Arena</p>
                    <h1>Choose your duel</h1>
                    <p>Pick a battle queue and solve faster than your opponent.</p>
                </div>

                <div className={s.modeGrid}>
                    <button className={`${s.modeCard} ${s.modeCardActive}`} onClick={() => navigate('unranked')}>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faGamepad} />
                        </span>
                        <span className={s.modeContent}>
                            <strong>Unranked</strong>
                            <span>Compete against other players without affecting your rank</span>
                        </span>
                        <FontAwesomeIcon className={s.modeAction} icon={faUserNinja} />
                    </button>
                    <button className={s.modeCard} disabled>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faTrophy} />
                        </span>
                        <span className={s.modeContent}>
                            <strong>Ranked</strong>
                            <span>Climb the ranks and prove your skills</span>
                        </span>
                        <FontAwesomeIcon className={s.modeAction} icon={faLock} />
                    </button>
                </div>
            </section>
            <button onClick={() => navigate('/home/arena')}>Go back</button>
        </main>
    )
}

