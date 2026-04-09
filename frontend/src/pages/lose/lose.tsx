import s from './lose.module.scss';
import { useBackToHome } from '../../utils/hooks.ts';

export function Lose() {
    const backToHome = useBackToHome();
    return (
        <div className={s.readyScreen}>
            Lose
            <button onClick={backToHome}>leave</button>
        </div>
    )
}