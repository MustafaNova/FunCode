import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import type { ClanOutletContext } from '../pages/clan/clanOutletContext.type.ts';

export function ClanMemberGuard() {
    const { isInClan } = useOutletContext<ClanOutletContext>();

    if (!isInClan) {
        return <Navigate to="/home/clan/clans" replace />;
    }

    return <Outlet />;
}

export function NoClanMemberGuard() {
    const { isInClan } = useOutletContext<ClanOutletContext>();

    if (isInClan) {
        return <Navigate to="/home/clan/chat" replace />;
    }

    return <Outlet />;
}