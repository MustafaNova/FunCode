import { ERROR_CODES, type ErrorCode } from '@funcode/shared';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
    [ERROR_CODES.SELF_FRIEND_REQUEST]: 'Self friend requests are not allowed',
    [ERROR_CODES.INVITE_CODE_NOT_FOUND]: 'Invite code not found.',
    [ERROR_CODES.FRIEND_REQUEST_ALREADY_EXISTS]: 'Friend request already exists.',
    [ERROR_CODES.FRIENDSHIP_ALREADY_EXISTS]: 'You are already friends.',
}



export function getErrorMessage(code: ErrorCode) {
    return ERROR_MESSAGES[code] ?? 'Something went wrong.';
}