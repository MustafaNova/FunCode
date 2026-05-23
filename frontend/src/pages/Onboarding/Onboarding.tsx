import s from './onboarding.module.scss'
import { me } from '../../services/auth.ts';
import { useEffect, useState } from 'react';
import type { MeRes } from '@funcode/shared';
import { useNavigate } from 'react-router-dom';
import { useTypingCode } from '../auth/useTypingCode.ts';

export function Onboarding() {
    const navigate = useNavigate();
    const [user, setUser] = useState<MeRes | null>(null);
    const [isLeaving, setIsLeaving] = useState(false);
    const [fromLogin] = useState(() => {
        const entry = window.sessionStorage.getItem('onboarding_entry');
        window.sessionStorage.removeItem('onboarding_entry');
        return entry === 'from_login';
    });
    const typedName = useTypingCode([user?.username ? `Hello ${user.username}` : '']);

    useEffect(() => {
        const loadUser = async () => {
            const data = await me();
            setUser(data);
        }
        loadUser();
    }, [])

    function handleContinue() {
        setIsLeaving(true);
        window.sessionStorage.setItem('course_selection_entry', 'from_onboarding');
        window.setTimeout(() => navigate("courses"), 280);
    }

    return (
        <section className={`${s.screen} ${fromLogin ? s.screenFromLogin : ''} ${isLeaving ? s.pageExit : ''}`}>
            <div className={s.arenaPanel}>
                <div className={s.statusRow}>
                    <span>Boot sequence</span>
                    <strong>Online</strong>
                </div>
                <div className={s.vsBadge}>PLAYER INIT</div>
                <div className={s.codeWindow}>
                    <pre>{typedName}<span className={s.cursor}>|</span></pre>
                </div>
            </div>
            <div className={s.onboardCard}>
                <div className={s.header}>
                    <span className={s.kicker}>Welcome to Funcode</span>
                    <h1>Loading Developer Mode</h1>
                    <p>Set up your profile before entering the arena.</p>
                </div>

                <div className={s.stepGrid} aria-label='Onboarding steps'>
                    <div>
                        <span>01</span>
                        <strong>Select Course</strong>
                    </div>
                    <div>
                        <span>02</span>
                        <strong>Have Fun!</strong>
                    </div>
                </div>

                <button className={s.submitButton} onClick={handleContinue}>
                    Continue
                </button>
            </div>
        </section>
    )
}
