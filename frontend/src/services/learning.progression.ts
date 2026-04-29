import { API_URLS } from '../constants/urls.ts';
import type { GetActiveScreenRes, GetLevelReq, GetLevelRes, ValidateLevelTaskReq } from '@funcode/shared';
import { useActiveScreen } from '../store/activeScreenStore.ts';

export async function getActiveScreen() {
    const response = await fetch(API_URLS.ACTIVE_SCREEN, {
        method: 'GET',
        credentials: 'include',
    })
    const res: GetActiveScreenRes = await response.json();
    useActiveScreen.getState().setAC(res);
}

export async function getLevel(req: GetLevelReq): Promise<GetLevelRes> {
    const res = await fetch(`${API_URLS.LEVELS}/${req.course}/${req.module}/${req.level}`, {
        method: 'GET',
        credentials: 'include',
    });
    return res.json();
}

export async function submitLevelTask(req: ValidateLevelTaskReq) {
    const res = await fetch(API_URLS.SUBMIT_LEVEL_TASK, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId: req.taskId, code: req.code })
    })
}
