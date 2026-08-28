import { API_URLS } from '../constants/urls.ts';
import {
    type GetBugHunterLevelContentRes, type GetPracticeProgressRes,
    type PracticeGameMode,
    type SubmitBugHunterSolRes,
    type SubmitBugHunterSolutionReq,
    type UnlockedLevelRes
} from '@funcode/shared';


export async function getBugHunterHighestUnlockedLevel() {
    const res = await fetch(API_URLS.GET_BUG_HUNTER_HIGHEST_UNLOCKED_LEVEL, {
        method: 'GET',
        credentials: 'include'
    })
    const unlockedLevelRes: UnlockedLevelRes = await res.json();
    return unlockedLevelRes;
}

export async function getGameProgress(gameMode: PracticeGameMode) {
    const res = await fetch(API_URLS.GET_PRACTICE_PROGRESS(gameMode), {
        method: 'GET',
        credentials: 'include',
    })
    const practiceProgress: GetPracticeProgressRes = await res.json();
    console.log(practiceProgress);
    return practiceProgress;

}


export async function getBugHunterLevel(levelId: string) {
    const res = await fetch(API_URLS.GET_BUG_HUNTER_LEVEL(levelId), {
        method: 'GET',
        credentials: 'include'
    })
    const levelContent: GetBugHunterLevelContentRes = await res.json();
    return levelContent;
}


export async function submitBugHunterSolution(levelId: string, payload: SubmitBugHunterSolutionReq) {
    const res = await fetch(API_URLS.SUBMIT_BUG_HUNTER_SOL(levelId), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    const solutionResult: SubmitBugHunterSolRes = await res.json()
    return solutionResult

}