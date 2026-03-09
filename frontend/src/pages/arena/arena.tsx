import s from './arena.module.scss'

export function Arena() {
    return (
        <div className={s.dFlex}>
            <button className={s.button}>1v1</button>
            <button className={s.button}>2v2</button>
        </div>
    )
}