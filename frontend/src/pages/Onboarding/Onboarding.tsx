import s from './onboarding.module.scss'
import { me } from '../../services/auth.ts';
import { useEffect, useState } from 'react';
import type { MeRes } from '@funcode/shared';
import { useNavigate } from 'react-router-dom';

export function Onboarding() {
    const navigate = useNavigate();
    const [user, setUser] = useState<MeRes | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const data = await me();
            setUser(data);
        }
        loadUser();
    }, [])


    return (
        <div className={s.screen}>
            <h1>Onboarding</h1>
            {user && (<div>
                <span>Hello {user.username}</span>
            </div>)
            }
            <button onClick={() => navigate("courses")}>start</button>
        </div>
    )
}
