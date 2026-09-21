import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBug,
    faCode,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import s from './specialModesPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { ArenaGameModeId } from '@funcode/shared';
import { joinMatchmaking, leaveMatchmaking } from '../../../services/socket/gameSocket.ts';
import { SearchingScreen } from '../searchingScreen.tsx';

export function SpecialModesPage() {
    const navigate = useNavigate();
    const [searchingGameMode, setSearchingGameMode] = useState<ArenaGameModeId | null>(null);
    async function startMatchMaking(
        gameModeId: ArenaGameModeId,
        readyPath: string
    ){
        setSearchingGameMode(gameModeId);
        try {
            await joinMatchmaking(() => {
                navigate('/match/ready', {
                    state: { readyPath }
                });
            }, { gameModeId })
        } catch {
            setSearchingGameMode(null);
        }
    }
    async function cancelMatchMaking(){
        if (!searchingGameMode) return;
        try {
            await leaveMatchmaking({ gameModeId: searchingGameMode });
        } finally {
            setSearchingGameMode(null);
        }

    }

    if (searchingGameMode) {
        return <SearchingScreen cancel={cancelMatchMaking} />
    }

    return (
        <main className="galaxyGridBackground">
            <section className={s.panel}>
                <div className={s.hero}>
                    <p className={s.kicker}>Special Modes</p>

                    <h1>Choose your challenge</h1>

                    <p>
                        Compete in unique coding modes with different rules
                        and objectives.
                    </p>
                </div>
                <div className={s.modeGrid}>
                    <button className={s.modeCard} onClick={() => startMatchMaking('bug-hunter-unranked-1v1', '/match/bug-hunter-unranked-1v1')}>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faBug} />
                        </span>

                        <span className={s.modeContent}>
                            <strong>Bug Hunter</strong>

                            <span>
                                Find the hidden bug before your opponent.
                            </span>
                        </span>

                        <FontAwesomeIcon
                            className={s.modeAction}
                            icon={faChevronRight}
                        />
                    </button>
                    <button className={s.modeCard} onClick={() => startMatchMaking('code-golf-unranked-1v1', '/match/code-golf-unranked-1v1')}>
                        <span className={s.modeIcon}>
                            <FontAwesomeIcon icon={faCode} />
                        </span>

                        <span className={s.modeContent}>
                            <strong>Code Golf</strong>

                            <span>
                                Solve the challenge using as few characters as possible.
                            </span>
                        </span>

                        <FontAwesomeIcon
                            className={s.modeAction}
                            icon={faChevronRight}
                        />
                    </button>
                </div>
            </section>
            <button onClick={() => navigate('/home/arena/1v1')}>back</button>
        </main>
    );
}
