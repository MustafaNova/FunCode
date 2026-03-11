import s from './arena.module.scss'
import { useNavigate } from 'react-router-dom';

export function Arena() {
    const navigate = useNavigate();
    return (
        <div className={s.dFlex}>
            <button className={s.button} onClick={() => navigate('1v1')}>1v1</button>
            <button className='notAvailable'>2v2</button>
        </div>
    )
}