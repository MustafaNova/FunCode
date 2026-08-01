import s from './practice.module.scss';
import { PRACTICE_GAME_MODES } from './practiceGameModes.ts';
import { useNavigate } from 'react-router-dom';

export function Practice() {
    const navigate = useNavigate();
    return (
        <div className={s.container}>
            {PRACTICE_GAME_MODES.map((gameMode) => (
                <div className={s.gameModeGrid}>
                    <button className={`${s.gameModeCard} ${!gameMode.available ? s.lockedCard : ''}`}
                            onClick={() => navigate(gameMode.route)}>
                        <img src={gameMode.img} className={s.gameModeImage} alt={gameMode.imgAlt}/>
                        <div className={s.gameModeContent}>
                            <div className={s.gameModeHeader}>
                                <h2 className={s.gameModeTitle}>
                                    {gameMode.name}
                                </h2>
                                <span className={gameMode.available ? s.availableBadge : s.lockedBadge}>
                                    {gameMode.available ? 'Available' : 'Locked'}
                                </span>
                            </div>
                            <p className={s.gameModeDescription}>
                                {gameMode.description}
                            </p>
                            <span className={s.playText}>
                                {gameMode.available ? 'Play now →' : 'Coming Soon'}
                            </span>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    )
}