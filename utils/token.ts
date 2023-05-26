import jwt, { type SignOptions, JwtPayload } from "jsonwebtoken";

interface DecodedToken {
    id: number;
    iat: number;
    exp: number;
}

export class TokensHandler {
    declare ACCESS_TOKEN_SECRET: string;
    declare REFRESH_TOKEN_SECRET: string;
    private declare defaultAccessSignOpt: Partial<SignOptions>;
    private declare defaultRefreshSignOpt: Partial<SignOptions>;

    constructor() {
        this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
        this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
        this.defaultAccessSignOpt = { expiresIn: "20s", algorithm: "HS256" };
        this.defaultRefreshSignOpt = { expiresIn: "60s", algorithm: "HS256" };
    }

    createAccessToken(data: Object, config?: SignOptions) {
        return jwt.sign(data, this.ACCESS_TOKEN_SECRET, {
            ...(config ? config : this.defaultAccessSignOpt),
        });
    }

    createRefreshToken(data: Object, config?: SignOptions) {
        return jwt.sign(data, this.REFRESH_TOKEN_SECRET, {
            ...(config ? config : this.defaultRefreshSignOpt),
        });
    }

    decodeToken(token: string) {
        const decodedToken: string | JwtPayload | null = jwt.decode(token);
        return decodedToken;
    }
}

const tokensHandler = new TokensHandler();

export default tokensHandler;
