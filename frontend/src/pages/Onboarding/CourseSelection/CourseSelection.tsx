import s from './courseSelection.module.scss';
import { getActiveScreen, initActiveScreen } from '../../../services/learning.progression.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { courses } from './courses.ts';


export function CourseSelection() {
    const navigate = useNavigate();
    const [isLaunching, setIsLaunching] = useState(false);

    async function handleCourseSelect(course: string) {
        if (isLaunching) return;
        setIsLaunching(true);
        await initActiveScreen(course)
        await getActiveScreen()
        navigate('/home')
    }

    return (
        <section className={`${s.screen}`}>
            <div className={s.selectionCard}>
                <div className={s.header}>
                    <span className={s.kicker}>Onboarding</span>
                    <h1>Choose Your Course</h1>
                    <p>Pick your first campaign to unlock lessons and battle progression.</p>
                </div>

                <div className={s.courseGrid}>
                    {courses.map((course) => {
                        const isAvailable = course.status === 'available';

                        return (
                            <button
                                key={course.id}
                                className={`${s.courseCard} ${isAvailable ? s.available : s.locked}`}
                                disabled={!isAvailable || isLaunching}
                                onClick={() => isAvailable && handleCourseSelect(course.id)}
                            >
                                <span className={s.cardTag}>
                                    {isAvailable ? 'Available now' : 'Coming soon'}
                                </span>
                                <strong>{course.title}</strong>
                                <p>{course.description}</p>
                                <span className={s.cardAction}>
                                    {isAvailable ? (isLaunching ? 'Launching...' : 'Start campaign') : 'Locked'}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
