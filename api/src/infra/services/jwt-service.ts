import jwt, { JwtPayload } from "jsonwebtoken";
import { IJwtService } from "./../../presentation/util/contracts/jwt-contract";

export class JwtService implements IJwtService {
    private getPrivateKey = (): string => process.env.JWT_SECRET_KEY!;

    createToken(data: any): string {
        const key = this.getPrivateKey();

        const token = jwt.sign(data, key, {
            expiresIn: "1d",
        });

        return token;
    }

    getPayload(token: string): string | undefined {
        const payload = jwt.verify(token, this.getPrivateKey());
        return payload ? (payload as string) : undefined;
    }
}

// export const jwtService = new JwtService();
