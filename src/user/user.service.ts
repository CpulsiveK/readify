import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}
    
    getProfile(request: Request) {
        return request.user
    }
}
