import { CODE_GOLF_LEVELS } from './codeGolfLevels.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { UnlockedLevelRes } from '@funcode/shared';
import s from './codeGolf.module.scss';
import { LevelSelection } from '../../components/LevelSelection/LevelSelection.tsx';


export function CodeGolf() {
    const navigate = useNavigate();
    const [unlockedLevelRes, setUnlockedLevelRes] = useState<UnlockedLevelRes | null>({ unlockedLevel: 1, completedAllLevels: false});
    const eyebrow = 'Code Golf';
    const title = 'Ready to Tee Off?';
    const subtitle = 'Write the shortest solution, beat the character limit, and master every level'


    if (unlockedLevelRes === null) {
        return <div className={s.txt}>Could not load progress</div>
    }

    return (
        <LevelSelection
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            levels={CODE_GOLF_LEVELS}
            unlockedLevel={unlockedLevelRes.unlockedLevel}
            completedAllLevels={unlockedLevelRes.completedAllLevels}
            onLevelClick={(level) => navigate(`/practice/code-golf/${level.id}`)}
            onBack={() => navigate('/home/practice')} />
    )
}