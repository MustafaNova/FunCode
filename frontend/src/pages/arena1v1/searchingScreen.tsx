import s from './arena1v1.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTerminal } from '@fortawesome/free-solid-svg-icons';

type CancelSearch = {
    cancel: () => void
}
export function SearchingScreen({ cancel }: CancelSearch) {
    return (
        <main className={s.screen}>
            <section className={`${s.panel} ${s.searchPanel}`}>
                <div className={s.searchIcon} aria-hidden="true">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

                <div className={s.hero}>
                    <p className={s.kicker}>Matchmaking</p>
                    <h1>Searching opponent</h1>
                    <p>Keeping your socket warm while a challenger joins the arena.</p>
                </div>

                <div className={s.searchTerminal}>
                    <FontAwesomeIcon icon={faTerminal} />
                    <span>scan_players(region: auto)</span>
                    <span className={s.cursor}>_</span>
                </div>

                <div className={s.progress} aria-hidden="true">
                    <span />
                </div>

                <button className={s.cancelButton} onClick={cancel}>
                    Cancel search
                </button>
            </section>
        </main>
    )
}