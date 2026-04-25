import { API_URLS } from '../constants/urls.ts';
import type { GetActiveScreenRes, GetLevelRes } from '@funcode/shared';
import { useActiveScreen } from '../store/activeScreenStore.ts';

export async function getActiveScreen() {
    const response = await fetch(API_URLS.ACTIVE_SCREEN, {
        method: 'GET',
        credentials: 'include',
    })
    const res: GetActiveScreenRes = await response.json();
    useActiveScreen.getState().setAC(res);
}

export async function getLevel(course: string, module: string, id: string): Promise<GetLevelRes> {
    const res = await fetch(`${API_URLS.LEVELS}/${course}/${module}/${id}`, {
        method: 'GET',
        credentials: 'include',
    });
    return res.json();
}
