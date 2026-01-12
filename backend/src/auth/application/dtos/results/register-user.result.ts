export type RegisterUserResult =
    | { success: true }
    | { success: false; reason: 'EMAIL_EXISTS' | 'USERNAME_EXISTS' };
