import { Navigate } from 'react-router-dom';

export function ClanIndexRedirect() {
    const isInClan = true;

    if (isInClan) {
        return <Navigate to={`home/clan/chat`} replace />;
    }

    return <Navigate to="home/clan" replace />;
}