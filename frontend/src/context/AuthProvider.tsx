import { useEffect, useState } from 'react';
import { me } from '../services/auth.ts';
import { AuthContext } from './authContext.ts';
import type { AuthUser } from './types.ts';


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    async function refreshUser() {
        const res = await me();
        setUser({
            userId: res.id,
            username: res.username
        });
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void refreshUser().finally(() => { setLoading(false) });
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
