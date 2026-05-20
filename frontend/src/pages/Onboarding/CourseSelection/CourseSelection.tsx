import s from './courseSelection.module.scss';


export function CourseSelection() {

    return (
        <div className={s.screen}>
            <h1>Courses</h1>
            <button className={s.course}>Full-Stack-Developer</button>
            <button className={s.disabled}>Coming Soon: Python</button>
            <button className={s.disabled}>Coming Soon: Cybersecurity</button>
            <button className={s.disabled}>Coming Soon: Java</button>
        </div>
    )
}