import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import type { ClanOutletContext } from '../pages/clan/clanOutletContext.type.ts';

export function ClanMemberGuard() {
    const context = useOutletContext<ClanOutletContext>();

    if (!context.isInClan) {
        return <Navigate to="/home/clan/clans" replace />;
    }

    return <Outlet context={context} />;
}

export function NoClanMemberGuard() {
    const context= useOutletContext<ClanOutletContext>();

    if (context.isInClan) {
        return <Navigate to="/home/clan/chat" replace />;
    }

    return <Outlet context={context} />;
}