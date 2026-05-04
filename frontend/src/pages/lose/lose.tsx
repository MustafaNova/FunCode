import s from './lose.module.scss';
import { useBackToHome } from '../../utils/hooks.ts';

export function Lose() {
    return (
        <div className={s.readyScreen}>
            Lose
            <button onClick={useBackToHome()}>leave</button>
        </div>
    )
}