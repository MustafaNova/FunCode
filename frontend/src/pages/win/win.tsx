import s from './win.module.scss';
import { useBackToHome } from '../../utils/hooks.ts';

export function Win() {
    const backToHome = useBackToHome();
    return (
        <div className={s.readyScreen}>
            Win
            <button onClick={backToHome}>leave</button>
        </div>
    )
}