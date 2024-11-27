import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(author: Prisma.AuthorCreateInput) {
    try {
      const existingUser = await this.prisma.author.findUnique({
        where: {
          email: author.email,
        },
      });
      if (existingUser) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      return await this.prisma.author.create({
        data: author,
      });
    } catch (error) {
      throw new HttpException(
        `Error during registration: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validate(username: string, password: string) {
    try {
      const user = await this.prisma.author.findUnique({
        where: {
          email: username,
          password: password,
        },
      });
      if (!user)
        throw new HttpException(
          'invalid credentials.',
          HttpStatus.UNAUTHORIZED,
        );
      return user;
    } catch (error) {
      throw new HttpException(
        `Error during login validation: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateById(id: string) {
    try {
      const user = await this.prisma.author.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          password: false,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException(
        `Error fetching user by ID: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async authors() {
    try {
      return await this.prisma.author.findMany({
        select: {
          id: true,
          email: true,
          password: false,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error fetching authors: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
