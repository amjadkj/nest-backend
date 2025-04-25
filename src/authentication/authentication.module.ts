import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule,JwtModule.register({
    secret:"aidfbadkbcabdvjklbadovu",
  })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports:[JwtModule]
})
export class AuthenticationModule {}
