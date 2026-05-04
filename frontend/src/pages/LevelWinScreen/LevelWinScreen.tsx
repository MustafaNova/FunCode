import s from './levelWinScreen.module.scss'
import { useBackToHome } from '../../utils/hooks.ts';

export function LevelWinScreen() {
    return (
        <div className={s.screen}>
            Level Completed
            <button onClick={useBackToHome()}>Go back</button>
        </div>
    )
}
