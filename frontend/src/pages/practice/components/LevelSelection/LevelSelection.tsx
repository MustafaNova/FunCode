import s from './levelSelection.module.scss';
import { LevelCard } from '../LevelCard/LevelCard.tsx';
import type { PracticeLevelCardData } from '../../../../types/practiceLevelCardData.ts';

type LevelSelectionProps = {
    eyebrow: string;
    title: string;
    subtitle: string;
    levels: PracticeLevelCardData[];
    unlockedLevel: number;
    completedAllLevels: boolean;
    onLevelClick: (level: PracticeLevelCardData) => void;
    onBack: () => void;
};


export function LevelSelection({
        eyebrow,
        title,
        subtitle,
        levels,
        unlockedLevel,
        completedAllLevels,
        onLevelClick,
        onBack,
    }: LevelSelectionProps
) {

    return (
        <section className={s.container}>
            <div className={s.header}>
                <span className={s.eyebrow}>{eyebrow}</span>
                <h1 className={s.title}>{title}</h1>
                <p className={s.subtitle}>
                    {subtitle}
                </p>
                <button onClick={onBack}>Go back</button>
            </div>
            <div className={s.levelGrid}>
                {levels.map((level) => (
                    <LevelCard
                        unlockedLevel={unlockedLevel}
                        completedAllLevels={completedAllLevels}
                        level={level}
                        onClick={() => onLevelClick(level)}
                    />
                ))}
            </div>
        </section>
    );
}