import { BUG_HUNTER_LEVELS } from './bugHunterLevels.ts';
import s from './bugHunter.module.scss';
import { useNavigate } from 'react-router-dom';


export function BugHunter() {
    const navigate = useNavigate();

    return (
        <section className={s.container}>
            <div className={s.header}>
                <span className={s.eyebrow}>Bug Hunter</span>
                <h1 className={s.title}>Choose your next challenge</h1>
                <p className={s.subtitle}>
                    Find the hidden bug, fix the code, and complete the level.
                </p>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>

            <div className={s.levelGrid}>
                {BUG_HUNTER_LEVELS.map((level, index) => (
                    <button key={level.id} className={s.levelCard}>
                        <div className={s.imageWrapper}>
                            <img src={level.image} alt={level.imgAlt} className={s.levelImage} />
                            <span className={s.levelNumber}>
                                Level {index + 1}
                            </span>
                        </div>
                        <div className={s.levelContent}>
                            <h2 className={s.levelName}>
                                {level.name}
                            </h2>
                            <span className={s.levelAction}>
                                Start challenge →
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}