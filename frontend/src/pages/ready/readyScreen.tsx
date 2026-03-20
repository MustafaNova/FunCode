import s from './ready.module.scss'
import { sendPlayerReady } from '../../services/socket.ts';

export function ReadyScreen() {
    return (
        <div className={s.readyScreen}>
            <button className={s.btn} onClick={sendPlayerReady}>Ready?</button>
        </div>
    )
}
