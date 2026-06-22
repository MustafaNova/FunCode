import s from './ready.module.scss'
import { onBattleStarted, sendPlayerReady } from '../../services/socket/gameSocket.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '../../store/matchStore.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faPlay, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { TerminalHeader } from './terminalHeader.tsx';


export function ReadyScreen() {
    const navigate = useNavigate();
    const setMatchTask = useMatchStore((s) => s.setMatchTask);
    const starterCode= '// Warm-up zone'
    const [code, setCode] = useState(starterCode);

    useEffect(() =>{
        return onBattleStarted((data) => {
            setMatchTask(data.task);
            navigate('/match')
        });
    }, [navigate, setMatchTask])


    return (
        <main className={s.screen}>
            <section className={s.panel}>
                <div className={s.hero}>
                    <p className={s.kicker}>Battle lobby</p>
                    <p>Warm up in the terminal, choose your language, and lock in when you are ready.</p>
                </div>

                <div className={s.toolbar}>
                    <button className={s.readyButton} onClick={sendPlayerReady}>
                        <FontAwesomeIcon icon={faPlay} />
                        Ready
                    </button>
                </div>

                <div className={s.terminalGrid}>
                    <section className={s.terminalPanel}>
                        <TerminalHeader title={'Warmup Console'} icon={faTerminal} />
                        <div className={s.terminalPrompt}>
                            <span className={s.prompt}>funcode@ready:~$</span>
                            <span className={s.cursor}>_</span>
                        </div>
                        <textarea
                            className={s.codeInput}
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            spellCheck={false}
                            aria-label="editor"
                        />
                    </section>
                </div>

                <div className={s.statusBar}>
                    <FontAwesomeIcon icon={faBolt} />
                    <span>waiting for both players to confirm</span>
                </div>
            </section>
        </main>
    )
}
