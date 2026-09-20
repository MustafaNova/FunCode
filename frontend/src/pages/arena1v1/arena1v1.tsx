import s from './arena1v1.module.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLock,
    faShieldHalved, faTrophy,
    faUserNinja,
    faWandMagicSparkles
} from '@fortawesome/free-solid-svg-icons';
import { SearchingScreen } from './searchingScreen.tsx';
import { joinMatchmaking, leaveMatchmaking } from '../../services/socket/gameSocket.ts';

export function Arena1v1() {
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();
    const startUnranked1v1 = async () => {
        setSearching(true);
        try {
            await joinMatchmaking(() => {
                navigate('/match/ready', {
                    state: {
                        readyPath: '/match/unranked-1v1'
                    }
                });
            }, { gameModeId: 'unranked-1v1' })
        } catch {
            setSearching(false);
        }

    }
    const cancelUnranked1v1 = async () => {
        await leaveMatchmaking({ gameModeId: 'unranked-1v1'});
        setSearching(false)
    }

    if (searching) {
        return <SearchingScreen cancel={cancelUnranked1v1} />
    }

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

                    <button className={`${s.modeCard} ${s.modeCardActive}`} onClick={() => navigate('special-modes')}>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faWandMagicSparkles} />
                        </span>
                        <span className={s.modeContent}>
                            <strong>Special Modes</strong>
                            <span>Compete in unique coding challenges</span>
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

