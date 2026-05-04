import s from './levelLose.module.scss'
import { useBackToHome } from '../../utils/hooks.ts';


export function LevelLoseScreen() {
    return (
        <div className={s.screen}>
            Level failed
            <button onClick={useBackToHome()}>Go back</button>
        </div>
    )
}
