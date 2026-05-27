import s from './comingSoon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faRocket, faTerminal } from '@fortawesome/free-solid-svg-icons';

export function ComingSoon() {
    return (
        <main className={s.screen}>
            <section className={s.panel}>
                <div className={s.terminal}>
                    <div className={s.terminalHeader}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className={s.codeLine}>
                        <span className={s.prompt}>funcode@dev:~$</span>
                        <span>deploy_feature --soon</span>
                        <span className={s.cursor}>_</span>
                    </div>
                </div>

                <div className={s.content}>
                    <p className={s.kicker}>Feature in progress</p>
                    <h1>Coming Soon</h1>
                    <p>This mode is being prepared for a future release.</p>
                </div>

                <div className={s.statusGrid}>
                    <div className={s.statusItem}>
                        <FontAwesomeIcon icon={faCodeBranch} />
                        <span>Building</span>
                    </div>
                    <div className={s.statusItem}>
                        <FontAwesomeIcon icon={faTerminal} />
                        <span>Testing</span>
                    </div>
                    <div className={s.statusItem}>
                        <FontAwesomeIcon icon={faRocket} />
                        <span>Launch queued</span>
                    </div>
                </div>
            </section>
        </main>
    )
}
