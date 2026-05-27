import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./level-loading.module.scss";
import { steps } from '../steps.ts';


export function LevelLoading() {
    return (
        <main className={s.screen} aria-busy="true" aria-live="polite">
            <section className={s.panel} aria-label="Loading level">
                <div className={s.terminal}>
                    <div className={s.terminalHeader}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className={s.codeLines}>
                        <span className={s.prompt}>funcode@level:~$</span>
                        <span>load_next_challenge()</span>
                        <span className={s.cursor}>_</span>
                    </div>
                </div>
                <div className={s.content}>
                    <p className={s.kicker}>Preparing mission</p>
                    <h1>Loading level</h1>
                    <p className={s.text}>Building your goals, concept notes, quiz, and code task.</p>
                </div>
                <div className={s.steps} aria-hidden="true">
                    {steps.map((step) => (
                        <div className={s.step}>
                            <FontAwesomeIcon icon={step.icon} />
                            <span>{step.tab}</span>
                        </div>
                    ))}
                </div>
                <div className={s.progress} aria-hidden="true">
                    <span />
                </div>
            </section>
        </main>
    );
}
