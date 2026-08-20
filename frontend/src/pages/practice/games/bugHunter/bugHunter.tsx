import { BUG_HUNTER_LEVELS } from './bugHunterLevels.ts';
import s from './bugHunter.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBugHunterHighestUnlockedLevel } from '../../../../services/practice.ts';
import type { UnlockedLevelRes } from '@funcode/shared';


export function BugHunter() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [unlockedLevelRes, setUnlockedLevelRes] = useState<UnlockedLevelRes | null>(null);

    useEffect(() => {
        async function getProgress() {
            try {
                const res = await getBugHunterHighestUnlockedLevel();
                setUnlockedLevelRes(res);
            } finally {
                setIsLoading(false);
            }
        }
        void getProgress()
    }, []);

    if (isLoading) {
        return <div className={s.txt}>...loading</div>
    }

    if (unlockedLevelRes === null) {
        return <div className={s.txt}>Could not load progress</div>
    }

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
                {BUG_HUNTER_LEVELS.map((level) => (
                    <button
                        className={`
                        ${s.levelCard} 
                        ${(unlockedLevelRes.unlockedLevel < level.level) && s.lockedCard} 
                        ${(unlockedLevelRes.completedAllLevels || (unlockedLevelRes.unlockedLevel > level.level)) && s.completedCard}`}
                        onClick={() => navigate(`/practice/bug-hunter/${level.id}`)}
                        disabled={unlockedLevelRes.completedAllLevels || unlockedLevelRes.unlockedLevel != level.level}>
                        <div className={s.imageWrapper}>
                            <img src={level.image} alt={level.imgAlt} className={s.levelImage} />
                            <span className={s.levelNumber}>
                                Level {level.level}
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
