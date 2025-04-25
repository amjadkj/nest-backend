import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: { email: string; password: string }, res: Response) {
    try {
      console.log(data.email);
      
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (user) {
        // console.log(user);
        
        const comparePassword = await bcrypt.compare(
          data.password,
          user.password,
        );
        // console.log(comparePassword);
        

        if (comparePassword) {
          const token = await this.jwtService.signAsync({
            id: user.id,
            role: user.role,
          });
          res.cookie('token', token);
          // console.log(token);
          return res
            .status(200)
            .json({ message: 'User logged successfully', success: true });
        } else {
          return res
            .status(400)
            .json({ message: 'Wrong password', success: false });
        }
      } else {
        return res
          .status(400)
          .json({ message: 'User does not exist', success: false });
      }
    } catch (error) {
      console.log('login error', error);
    }
  }
}
