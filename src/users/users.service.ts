import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(
    data: {
      name: string;
      email: string;
      password: string;
      confirmpassword: string;
      role: Role;
    },
    res: Response,
  ) {
    try {
      const email = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (!email) {
        if (data.password == data.confirmpassword) {
          const hashedPassword = await bcrypt.hash(data.password, 10);
          await this.prisma.user.create({
            data: {
              name: data.name,
              email: data.email,
              password: hashedPassword,
              role: data.role,
            },
          });
          return res
            .status(200)
            .json({ message: 'User data created Successfully' });
        } else {
          return res.status(400).json({ message: "Password Does'nt match" });
        }
      } else {
        return res.status(404).json({ message: 'Email Already exists' });
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async getUsers(res: Response) {
    try {
      const users = await this.prisma.user.findMany();
      return res.status(200).json({ message: users, success: true });
    } catch (error) {
      console.log('errorrr', error);
    }
  }

  async getById(id: number, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });
      return res.status(200).json({ message: user, success: true });
    } catch (error) {
      return res.status(400).json({ message: 'Cannot find user values by id' });
    }
  }

  async update(
    id: number,
    res: Response,
    body: {
      name: string;
      email: string;
      password: string;
      role: Role;
    },
  ) {
    try {
      const user = await this.prisma.user.update({
        where: { id: id },
        data: body,
      });
      return res.status(200).json({ message: user, success: true });
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Cannot update user values by id' });
    }
  }

  async deleting(id: number, res: Response) {
    try {
      const user = await this.prisma.user.delete({
        where: { id: id },
      });
      return res.status(200).json({ message: user, success: true });
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Cannot delete user values by id' });
    }
  }
}
