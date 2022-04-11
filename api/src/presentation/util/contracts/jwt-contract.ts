export interface IJwtService {
    createToken: (data: any) => string;
    getPayload: (token: string) => string | undefined;
}
