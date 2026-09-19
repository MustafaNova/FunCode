import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBug,
    faCode,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import s from './specialModesPage.module.scss';
import { useNavigate } from 'react-router-dom';

export function SpecialModesPage() {
    const navigate = useNavigate();

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
                    <button className={s.modeCard}>
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
                    <button className={s.modeCard}>
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