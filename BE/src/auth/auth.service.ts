import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = await this.usersService.create({
      ...registerDto,
      yearlyLeaveQuota: 18,
    });

    const payload = { sub: (user as any)._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: (user as any)._id,
        email: user.email,
        yearlyLeaveQuota: user.yearlyLeaveQuota,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: (user as any)._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: (user as any)._id,
        email: user.email,
        yearlyLeaveQuota: user.yearlyLeaveQuota,
      },
    };
  }
}
