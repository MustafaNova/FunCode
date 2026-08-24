import { BUG_HUNTER_LEVELS } from './bugHunterLevels.ts';
import s from './bugHunter.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBugHunterHighestUnlockedLevel } from '../../../../services/practice.ts';
import type { UnlockedLevelRes } from '@funcode/shared';
import { LevelSelection } from '../../components/LevelSelection/LevelSelection.tsx';


export function BugHunter() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [unlockedLevelRes, setUnlockedLevelRes] = useState<UnlockedLevelRes | null>(null);
    const eyebrow = 'Bug Hunter';
    const title = 'Choose your next challenge';
    const subtitle = 'the hidden bug, fix the code, and complete the level';

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
        <LevelSelection
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            levels={BUG_HUNTER_LEVELS}
            unlockedLevel={unlockedLevelRes.unlockedLevel}
            completedAllLevels={unlockedLevelRes.completedAllLevels}
            onLevelClick={(level) => navigate(`/practice/bug-hunter/${level.id}`)}
            onBack={() => navigate('/home/practice')}
        />
    );
}
