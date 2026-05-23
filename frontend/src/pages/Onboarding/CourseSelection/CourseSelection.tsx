import s from './courseSelection.module.scss';
import { getActiveScreen, initActiveScreen } from '../../../services/learning.progression.ts';
import { useNavigate } from 'react-router-dom';


export function CourseSelection() {
    const navigate = useNavigate();
    async function handleCourseSelect(course: string) {
        await initActiveScreen(course)
        await getActiveScreen()
        navigate('/home')
    }

    return (
        <div className={s.screen}>
            <h1>Courses</h1>
            <button className={s.course} onClick={() => handleCourseSelect('Full-Stack-Developer') }>Full-Stack-Developer</button>
            <button className={s.disabled}>Coming Soon: Python</button>
            <button className={s.disabled}>Coming Soon: Cybersecurity</button>
            <button className={s.disabled}>Coming Soon: Java</button>
        </div>
    )
}