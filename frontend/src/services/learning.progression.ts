import { API_URLS } from '../constants/urls.ts';
import type { GetActiveScreenRes } from '@funcode/shared';
import { useActiveScreen } from '../store/activeScreenStore.ts';

export async function getActiveScreen() {
    const response = await fetch(API_URLS.ACTIVE_SCREEN, {
        method: 'GET',
        credentials: 'include',
    })
    const res: GetActiveScreenRes = await response.json();
    useActiveScreen.getState().setAC(res);
}

export async function getLevel(id: string) {
    const res = await fetch(`${API_URLS.LEVELS}/${id}`);
    return res.json();
}
