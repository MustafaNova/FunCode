import { API_URLS } from '../constants/urls.ts';
import {
    type GetPracticeProgressRes,
    type PracticeGameMode,
    type PracticeLevelResponseByMode,
    type SubmitBugHunterSolRes,
    type SubmitBugHunterSolutionReq,
} from '@funcode/shared';


export async function getGameProgress(gameMode: PracticeGameMode) {
    const res = await fetch(API_URLS.GET_PRACTICE_PROGRESS(gameMode), {
        method: 'GET',
        credentials: 'include',
    })
    const practiceProgress: GetPracticeProgressRes = await res.json();
    console.log(practiceProgress);
    return practiceProgress;

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


export async function getPracticeLevel<T extends PracticeGameMode>(gameMode: T, levelId: string) {
    const res = await fetch(API_URLS.GET_PRACTICE_LEVEL(gameMode, levelId), {
        method: 'GET',
        credentials: 'include'
    })

    const practiceLevel: PracticeLevelResponseByMode[T] = await res.json();
    return practiceLevel;
}