import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('profile')
    getProfile(@Req() req: Request) {
        return this.userService.getProfile(req);
    }
}
