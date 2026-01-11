export interface JwtRequest extends Request {
    user: {
        sub: string;
    };
}
