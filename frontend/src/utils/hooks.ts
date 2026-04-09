import { useNavigate } from 'react-router-dom';

export function useBackToHome() {
    const navigate = useNavigate();

    return () => {
        navigate('/home');
    }
}