import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwt: JwtService) {}

    async signup(dto: SignupDto) {
        try {
            const hash = await argon.hash(dto.password);

            const user = await this.prismaService.user.create({
                data: {
                    firstname: dto.firstname,
                    lastname: dto.lastname,
                    email: dto.email,
                    hash: hash,
                }
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ForbiddenException("Credentials taken");
            }
        }

    }

    async signin(dto: SigninDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        if (!user) {throw new ForbiddenException("Credentials incorrect")}

        const passwordMatch = argon.verify(user.hash, dto.password);

        if (!passwordMatch) {throw new ForbiddenException("Credentials incorrect")}

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '24h',
            secret: process.env.JWT_CONSTANT!,
        });

        return {
            access_token: token,
        }
    }
}
