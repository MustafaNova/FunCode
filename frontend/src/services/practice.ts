import { API_URLS } from '../constants/urls.ts';
import { type UnlockedLevelRes } from '@funcode/shared';


export async function getBugHunterHighestUnlockedLevel() {
    const res = await fetch(API_URLS.GET_BUG_HUNTER_HIGHEST_UNLOCKED_LEVEL, {
        method: 'GET',
        credentials: 'include'
    })
    const unlockedLevelRes: UnlockedLevelRes = await res.json();
    return unlockedLevelRes;
}