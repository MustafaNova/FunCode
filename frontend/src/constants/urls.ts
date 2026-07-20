const API_URL = "/api"

export const API_URLS = {
    REGISTER: `${API_URL}/auth/register`,
    LOGIN: `${API_URL}/auth/login`,
    ME: `${API_URL}/auth/me`,
    JOIN_MATCHMAKING: `${API_URL}/matchmaking/join`,
    LEAVE_MATCHMAKING: `${API_URL}/matchmaking/leave`,
    ACTIVE_SCREEN: `${API_URL}/active-screen`,
    START_COURSE: `${API_URL}/active-screen/start-course`,
    LEVELS: `${API_URL}/levels`,
    SUBMIT_LEVEL_TASK: `${API_URL}/levels/submit`,
    CREATE_CLAN: `${API_URL}/clans`,
    GET_MY_CLAN: `${API_URL}/clans/me`,
    LEAVE_CLAN: `${API_URL}/clans/me`,
    SEARCH_CLANS: `${API_URL}/clans/search`,
    JOIN_CLAN: `${API_URL}/clans/join`,
    GET_CLAN_MESSAGES: `${API_URL}/clan-chat/messages`,
    SEND_FRIEND_REQUEST: `${API_URL}/friends/friend-request`,
    GET_INCOMING_FRIEND_REQUESTS: `${API_URL}/friends/friend-requests/incoming`,
    ACCEPT_FRIEND_REQUEST: `${API_URL}/friends/friend-requests/accept`,
    DECLINE_FRIEND_REQUEST: `${API_URL}/friends/friend-requests/decline`,
    GET_FRIENDS: `${API_URL}/friends`
}
