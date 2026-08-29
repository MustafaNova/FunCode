import type { PracticeGameMode } from '@funcode/shared';

const API_URL = "/api"

export const API_URLS = {
    REGISTER: `${API_URL}/auth/register`,
    LOGIN: `${API_URL}/auth/login`,
    ME: `${API_URL}/auth/me`,
    JOIN_MATCHMAKING: `${API_URL}/matchmaking/join`,
    LEAVE_MATCHMAKING: `${API_URL}/matchmaking/leave`,
    ACTIVE_SCREEN: `${API_URL}/active-screen`,
    START_COURSE: `${API_URL}/active-screen/start-course`,
    LEVELS: (course: string, module: string, level: number) => `${API_URL}/levels/${course}/${module}/${level}`,
    SUBMIT_LEVEL_TASK: `${API_URL}/levels/submit`,
    CREATE_CLAN: `${API_URL}/clans`,
    GET_MY_CLAN: `${API_URL}/clans/me`,
    LEAVE_CLAN: `${API_URL}/clans/me`,
    SEARCH_CLANS: `${API_URL}/clans/search`,
    JOIN_CLAN: (clanId: string) => `${API_URL}/clans/join/${clanId}`,
    GET_CLAN_MESSAGES: `${API_URL}/clan-chat/messages`,
    SEND_FRIEND_REQUEST: `${API_URL}/friends/friend-request`,
    GET_INCOMING_FRIEND_REQUESTS: `${API_URL}/friends/friend-requests/incoming`,
    ACCEPT_FRIEND_REQUEST: (friendReqId: string) => `${API_URL}/friends/friend-requests/accept/${friendReqId}`,
    DECLINE_FRIEND_REQUEST: (friendReqId: string) => `${API_URL}/friends/friend-requests/decline/${friendReqId}`,
    GET_FRIENDS: `${API_URL}/friends`,
    DELETE_FRIEND: (friendUserId: string) => `${API_URL}/friends/${friendUserId}`,
    GET_BUG_HUNTER_HIGHEST_UNLOCKED_LEVEL: `${API_URL}/practice/bug-hunter/unlocked-level`,
    GET_BUG_HUNTER_LEVEL: (levelId: string) => `${API_URL}/practice/bug-hunter/levels/${levelId}`,
    SUBMIT_BUG_HUNTER_SOL: (levelId: string) => `${API_URL}/practice/bug-hunter/levels/${levelId}/submit`,
    GET_PRACTICE_PROGRESS: (gameMode: PracticeGameMode) => `${API_URL}/practice/${gameMode}/progress`,
    GET_PRACTICE_LEVEL: (gameMode: PracticeGameMode, levelId: string) => `${API_URL}/practice/levels/${gameMode}/${levelId}`

}
