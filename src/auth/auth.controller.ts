import { Controller, Get, Post, UseGuards, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { SessionGuard } from './guards/session.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(SessionGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.status(204).send();
    });
  }

  @Get('me')
  @UseGuards(SessionGuard)
  getMe(@Req() req: Request) {
    return req.user;
  }
}
