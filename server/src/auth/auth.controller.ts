import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwt: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: Prisma.AuthorCreateInput, @Res() res: Response) {
    try {
      const newAuthor = await this.authService.register(body);
      const token = this.jwt.sign({
        id: newAuthor.id,
        email: newAuthor.email,
      });

      res.cookie('token', token, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      return res
        .status(HttpStatus.CREATED)
        .json({ email: newAuthor.email, token });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request, @Res() res: Response) {
    try {
      const token = this.jwt.sign({ id: req.user.id, email: req.user.email });
            res.cookie('token', token, {
              expires: new Date(Date.now() + 3600000), // 1 hour
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            });
      return res.status(HttpStatus.OK).json({ email: req.user.email, token });
    } catch (error) {
      throw new HttpException('Login Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req: Request, @Res() res: Response) {
    try {
      res.clearCookie('token');
      return res.status(HttpStatus.OK).json({ message: 'Logged out' });
    } catch (error) {
      throw new HttpException('logout Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('author/:id')
  @UseGuards(AuthGuard('jwt'))
  async author(@Param('id') id: string) {
    try {
      const author = await this.authService.validateById(id);
      return author;
    } catch (error) {
      throw new HttpException('logout Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('authors')
  @UseGuards(AuthGuard('jwt'))
  async authors() {
    try {
      const author = await this.authService.authors();
      return author;
    } catch (error) {
      throw new HttpException('logout Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }
}
