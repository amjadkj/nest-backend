import { Role } from '@prisma/client';
import { Body, Controller, Post, Res, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AllowedRoles } from 'src/authorisation/authorisation.decorator';
import { AuthorisationGuard } from 'src/authorisation/authorisation.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  createUser(
    @Body()
    data: {
      name: string;
      email: string;
      password: string;
      confirmpassword: string;
      role: Role;
    },
    @Res() res: Response,
  ) {
    return this.userService.createUser(data, res);
  }
  @UseGuards(AuthorisationGuard)
  @AllowedRoles('ADMIN')
  @Get('get-users')
  getUsers(@Res() res: Response) {
    return this.userService.getUsers(res);
  }
}
