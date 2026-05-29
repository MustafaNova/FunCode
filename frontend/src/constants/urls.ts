export const SERVER_URL = "/api"

export const API_URLS = {
    REGISTER: `${SERVER_URL}/auth/register`,
    LOGIN: `${SERVER_URL}/auth/login`,
    ME: `${SERVER_URL}/auth/me`,
    JOIN_MATCHMAKING: `${SERVER_URL}/matchmaking/join`,
    LEAVE_MATCHMAKING: `${SERVER_URL}/matchmaking/leave`,
    ACTIVE_SCREEN: `${SERVER_URL}/active-screen`,
    START_COURSE: `${SERVER_URL}/active-screen/start-course`,
    LEVELS: `${SERVER_URL}/levels`,
    SUBMIT_LEVEL_TASK: `${SERVER_URL}/levels/submit`,
}
