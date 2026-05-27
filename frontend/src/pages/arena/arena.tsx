import s from './arena.module.scss'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCode, faLock, faTerminal, faUserGroup } from '@fortawesome/free-solid-svg-icons';

export function Arena() {
    const navigate = useNavigate();

    return (
        <main className={s.screen}>
            <section className={s.panel}>
                <div className={s.terminal}>
                    <div className={s.terminalHeader}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className={s.codeLines}>
                        <span className={s.prompt}>funcode@arena:~$</span>
                        <span>select_battle_mode()</span>
                        <span className={s.cursor}>_</span>
                    </div>
                </div>

                <div className={s.hero}>
                    <p className={s.kicker}>Competitive playground</p>
                    <h1>Arena</h1>
                    <p>Enter a coding duel and prove your implementation under pressure.</p>
                </div>

                <div className={s.modeGrid}>
                    <button className={`${s.modeCard} ${s.modeCardActive}`} onClick={() => navigate('1v1')}>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faBolt} />
                        </span>
                        <span className={s.modeContent}>
                            <strong>1v1</strong>
                            <span>Live coding duel</span>
                        </span>
                        <FontAwesomeIcon className={s.modeAction} icon={faCode} />
                    </button>

                    <button className={s.modeCard} disabled>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faUserGroup} />
                        </span>
                        <span className={s.modeContent}>
                            <strong>2v2</strong>
                            <span>Team battle</span>
                        </span>
                        <FontAwesomeIcon className={s.modeAction} icon={faLock} />
                    </button>
                </div>

                <div className={s.statusBar}>
                    <FontAwesomeIcon icon={faTerminal} />
                    <span>matchmaking service online</span>
                </div>
            </section>
        </main>
    )
}
