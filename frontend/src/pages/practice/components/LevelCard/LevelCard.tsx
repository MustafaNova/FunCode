import s from '../../games/bugHunter/bugHunter.module.scss';
import type { PracticeLevelCardData } from '../../../../types/practiceLevelCardData.ts';

type LevelCardProps = {
    unlockedLevel: number,
    completedAllLevels: boolean,
    level: PracticeLevelCardData,
    onClick: () => void
}

export function LevelCard({ unlockedLevel, completedAllLevels, level, onClick } : LevelCardProps) {

    return (
        <button
            className={`
            ${s.levelCard} 
            ${(unlockedLevel < level.level) && s.lockedCard} 
            ${(completedAllLevels || (unlockedLevel > level.level)) && s.completedCard}`}
            onClick={onClick}
            disabled={completedAllLevels || unlockedLevel != level.level}>
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
    )
}