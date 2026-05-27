import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faTerminal } from '@fortawesome/free-solid-svg-icons';
import s from './notFound.module.scss'

export function NotFound() {
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
                        <span className={s.prompt}>funcode@router:~$</span>
                        <span>resolve_route()</span>
                        <span className={s.error}>404: path not found</span>
                        <span className={s.cursor}>_</span>
                    </div>
                </div>

                <div className={s.content}>
                    <div className={s.statusIcon}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <p className={s.kicker}>Route missing</p>
                    <h1>404</h1>
                    <p>The page you requested does not exist or has moved.</p>
                </div>

                <Link className={s.homeLink} to="/home">
                    <FontAwesomeIcon icon={faHouse} />
                    Back home
                </Link>

                <div className={s.statusBar}>
                    <FontAwesomeIcon icon={faTerminal} />
                    <span>The router hit a dead end.</span>
                </div>
            </section>
        </main>
    )
}
