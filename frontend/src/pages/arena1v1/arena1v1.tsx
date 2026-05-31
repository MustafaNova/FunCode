import s from './arena1v1.module.scss'
import { useState } from 'react';
import { leaveUnranked1v1, matchmakingUnranked1v1 } from '../../services/matchmaking.ts';
import { useNavigate } from 'react-router-dom';
import { SOCKET_EVENTS } from '@funcode/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faCodeBranch, faLock, faShieldHalved, faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { SearchingScreen } from './searchingScreen.tsx';
import { getSocket } from '../../services/socket.ts';

export function Arena1v1() {
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();

    const startUnranked1v1 = async () => {
        setSearching(true)
        const socket = await getSocket()
        socket.off(SOCKET_EVENTS.MATCH_FOUND)
        socket.once(SOCKET_EVENTS.MATCH_FOUND, () => {
            navigate('/match/ready');
            setSearching(false);
        });
        await matchmakingUnranked1v1();

    }
    const cancelUnranked1v1 = async () => {
        await leaveUnranked1v1()
        setSearching(false)
    }

    if (searching) {
        return <SearchingScreen cancel={cancelUnranked1v1} />
    }

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
                    <button className={`${s.modeCard} ${s.modeCardActive}`} onClick={startUnranked1v1}>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faShieldHalved} />
                        </span>
                        <span className={s.modeContent}>
                            <strong>Unranked</strong>
                            <span>Practice duel without rank pressure</span>
                        </span>
                        <FontAwesomeIcon className={s.modeAction} icon={faUserNinja} />
                    </button>

                    <button className={s.modeCard} disabled>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faBug} />
                        </span>
                        <span className={s.modeContent}>
                            <strong>Bug Hunt</strong>
                            <span>Debug race</span>
                        </span>
                        <FontAwesomeIcon className={s.modeAction} icon={faLock} />
                    </button>

                    <button className={s.modeCard} disabled>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faCodeBranch} />
                        </span>
                        <span className={s.modeContent}>
                            <strong>Random Language</strong>
                            <span>Surprise stack challenge</span>
                        </span>
                        <FontAwesomeIcon className={s.modeAction} icon={faLock} />
                    </button>
                </div>
            </section>
        </main>
    )
}

