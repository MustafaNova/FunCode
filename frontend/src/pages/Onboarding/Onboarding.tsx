import s from './onboarding.module.scss'
import { me } from '../../services/auth.ts';
import { useEffect, useState } from 'react';
import type { MeRes } from '@funcode/shared';
import { useNavigate } from 'react-router-dom';

export function Onboarding() {
    const navigate = useNavigate();
    const [user, setUser] = useState<MeRes | null>(null);
    const [typedName, setTypedName] = useState('');
    const [fromLogin, setFromLogin] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            const data = await me();
            setUser(data);
        }
        loadUser();
    }, [])

    useEffect(() => {
        const entry = window.sessionStorage.getItem('onboarding_entry');
        if (entry === 'from_login') {
            setFromLogin(true);
        }
        window.sessionStorage.removeItem('onboarding_entry');
    }, []);

    useEffect(() => {
        if (!user?.username) return;

        const greeting = `Hello ${user.username}`;
        setTypedName('');
        let index = 0;

        const intervalId = window.setInterval(() => {
            index += 1;
            setTypedName(greeting.slice(0, index));

            if (index >= greeting.length) {
                window.clearInterval(intervalId);
            }
        }, 55);

        return () => window.clearInterval(intervalId);
    }, [user?.username])

    return (
        <section className={`${s.screen} ${fromLogin ? s.screenFromLogin : ''}`}>
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

                <button className={s.submitButton} onClick={() => navigate("courses")}>
                    Continue
                </button>
            </div>
        </section>
    )
}
