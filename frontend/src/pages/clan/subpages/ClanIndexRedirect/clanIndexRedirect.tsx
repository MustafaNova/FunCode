import { Navigate, useOutletContext } from 'react-router-dom';
import type { ClanOutletContext } from '../../clanOutletContext.type.ts';

export function ClanIndexRedirect() {
    const { isInClan } = useOutletContext<ClanOutletContext>()

    if (isInClan) {
        return <Navigate to="/home/clan/chat" replace />;
    }

    return <Navigate to="/home/clan/clans" replace />;
}