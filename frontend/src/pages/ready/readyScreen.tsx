import s from './ready.module.scss'
import { onBattleStarted, sendPlayerReady } from '../../services/socket.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '../../store/matchStore.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faPlay, faTerminal } from '@fortawesome/free-solid-svg-icons';

type Language = 'javascript' | 'python';

const starterCode: Record<Language, string> = {
    javascript: `function solution(input) {
  return input;
}`,
    python: `def solution(input):
    return input`,
};

export function ReadyScreen() {
    const navigate = useNavigate();
    const setMatchTask = useMatchStore((s) => s.setMatchTask);
    const [language, setLanguage] = useState<Language>('javascript');
    const [code, setCode] = useState(starterCode.javascript);

    useEffect(() =>{
        return onBattleStarted((data) => {
            setMatchTask(data.task);
            navigate('/match')
        });
    }, [navigate, setMatchTask])

    function changeLanguage(nextLanguage: Language) {
        setLanguage(nextLanguage);
        setCode(starterCode[nextLanguage]);
    }


    return (
        <main className={s.screen}>
            <section className={s.panel}>
                <div className={s.hero}>
                    <p className={s.kicker}>Battle lobby</p>
                    <h1>Ready room</h1>
                    <p>Warm up in the terminal, choose your language, and lock in when you are ready.</p>
                </div>

                <div className={s.toolbar}>
                    <div className={s.languageToggle} aria-label="Select language">
                        <button
                            className={language === 'javascript' ? s.activeLanguage : ''}
                            onClick={() => changeLanguage('javascript')}
                            type="button"
                        >
                            JavaScript
                        </button>
                        <button
                            className={language === 'python' ? s.activeLanguage : ''}
                            onClick={() => changeLanguage('python')}
                            type="button"
                        >
                            Python
                        </button>
                    </div>

                    <button className={s.readyButton} onClick={sendPlayerReady}>
                        <FontAwesomeIcon icon={faPlay} />
                        Ready
                    </button>
                </div>

                <div className={s.terminalGrid}>
                    <section className={s.terminalPanel}>
                        <TerminalHeader title={`${language} terminal`} icon={faTerminal} />
                        <div className={s.terminalPrompt}>
                            <span className={s.prompt}>funcode@ready:~$</span>
                            <span>edit_solution.{language === 'javascript' ? 'js' : 'py'}</span>
                            <span className={s.cursor}>_</span>
                        </div>
                        <textarea
                            className={s.codeInput}
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            spellCheck={false}
                            aria-label="Solution editor"
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

function TerminalHeader({ title, icon }: { title: string; icon: typeof faTerminal }) {
    return (
        <div className={s.terminalHeader}>
            <div className={s.windowDots}>
                <span />
                <span />
                <span />
            </div>
            <div className={s.terminalTitle}>
                <FontAwesomeIcon icon={icon} />
                <span>{title}</span>
            </div>
        </div>
    );
}
