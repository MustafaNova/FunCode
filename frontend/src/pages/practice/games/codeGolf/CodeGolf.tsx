import { CODE_GOLF_LEVELS } from './codeGolfLevels.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { GetPracticeProgressRes } from '@funcode/shared';
import s from './codeGolf.module.scss';
import { LevelSelection } from '../../components/LevelSelection/LevelSelection.tsx';
import { getGameProgress } from '../../../../services/practice.ts';


export function CodeGolf() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState<GetPracticeProgressRes | null>({ highestUnlockedLevel: 1, completedAllLevels: false});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const eyebrow = 'Code Golf';
    const title = 'Ready to Tee Off?';
    const subtitle = 'Write the shortest solution, beat the character limit, and master every level';

    useEffect(() => {
        async function getProgress() {
            try {
                const res = await getGameProgress('code-golf');
                setProgress(res);
            } finally {
                setIsLoading(false);
            }
        }
        void getProgress()
    }, []);

    if (isLoading) {
        return <div className={s.txt}>...loading</div>
    }


    if (progress === null) {
        return <div className={s.txt}>Could not load progress</div>
    }

    return (
        <LevelSelection
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            levels={CODE_GOLF_LEVELS}
            unlockedLevel={progress.highestUnlockedLevel}
            completedAllLevels={progress.completedAllLevels}
            onLevelClick={(level) => navigate(`/practice/code-golf/${level.id}`)}
            onBack={() => navigate('/home/practice')} />
    )
}