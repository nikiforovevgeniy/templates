import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (error: unknown, data: string) => void) {
    done(null, user.id);
  }

  async deserializeUser(
    userId: string,
    done: (error: unknown, data: Omit<User, 'password'> | null) => void,
  ) {
    try {
      const user = await this.usersService.findById(userId);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}
