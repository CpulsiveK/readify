import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma-client/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private prismaService: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_CONSTANT!,
        });
    }

    async validate(payload: {sub: number; email: string}) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.sub,
            }
        });

        delete user.hash;
        return user;
    }
}