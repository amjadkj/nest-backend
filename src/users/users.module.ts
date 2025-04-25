import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorisationGuard } from 'src/authorisation/authorisation.guard';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports:[PrismaModule,AuthenticationModule],
  controllers: [UsersController],
  providers: [UsersService,AuthorisationGuard]
})
export class UsersModule {}
