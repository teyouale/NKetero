import { randomBytes } from 'node:crypto';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  BusinessDto,
  LoginDto,
  PhoneNumberSchema,
  RegisterDto,
  UserWithSecrets,
} from '@ketero/dto';
import * as bcryptjs from 'bcryptjs';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config/schema';
import { UserService } from '../user/user.service';
import { Payload } from './utils/payload';
import { Role } from './utils/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  private hash(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  private compare(password: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(password, hash);
  }

  private async validatePassword(password: string, hashedPassword: string) {
    const isValid = await this.compare(password, hashedPassword);

    if (!isValid) {
      throw new BadRequestException('InvalidCredentials');
    }
  }

  generateToken(
    grantType: 'access' | 'refresh' | 'reset' | 'verification',
    payload?: Payload
  ) {
    switch (grantType) {
      case 'access': {
        if (!payload)
          throw new InternalServerErrorException('InvalidTokenPayload');
        return this.jwtService.sign(payload, {
          secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
          expiresIn: '15m', // 15 minutes
        });
      }

      case 'refresh': {
        if (!payload)
          throw new InternalServerErrorException('InvalidTokenPayload');
        return this.jwtService.sign(payload, {
          secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
          expiresIn: '2d', // 2 days
        });
      }

      case 'reset':
      case 'verification': {
        return randomBytes(32).toString('base64url');
      }
    }
  }

  async setLastSignedIn(email: string) {
    await this.userService.updateByEmail(email, {
      secrets: { update: { lastSignedIn: new Date() } },
    });
  }

  async setRefreshToken(userId: string, token: string | null) {
    await this.userService.updateByID(userId, {
      secrets: {
        update: {
          refreshToken: token,
          lastSignedIn: token ? new Date() : undefined,
        },
      },
    });
  }

  async validateRefreshToken(payload: Payload, token: string) {
    const user = await this.userService.findOneById(payload.id);
    const storedRefreshToken = user.secrets?.refreshToken;

    if (!storedRefreshToken || storedRefreshToken !== token)
      throw new ForbiddenException();

    return user;
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await this.hash(registerDto.password);
    const businessProfile: any = {
      name: `${registerDto.username}'s Business`,
      workingHours: [],
      location: registerDto.business?.location ?? '',
      description: '',
      manager: registerDto.manager
    };
    // console.log("second")
    const parsedPhoneNumber = PhoneNumberSchema.safeParse(
      registerDto.phoneNumber
    );
    if (!parsedPhoneNumber.success) {
      throw new Error('Invalid phone number provided');
    }
    const data: any = {
      name: registerDto.name,
      email: registerDto.email,
      username: registerDto.username,
      role: registerDto.role,
      phoneNumber: parsedPhoneNumber.data,
      emailVerified: false, // Set to true if you don't want to verify user's email
      secrets: { create: { password: hashedPassword } },
    };
    if (registerDto.role === Role.Business) {
      data.business = { create: businessProfile };
    }
    try {
      const user = await this.userService.create(data);
      return user as UserWithSecrets;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('UserAlreadyExists');
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async authenticate({ identifier, password }: LoginDto) {
    try {
      const user = await this.userService.findOneByIdentifierOrThrow(
        identifier
      );

      if (!user.secrets?.password) {
        throw new BadRequestException('OAuthUser');
      }

      await this.validatePassword(password, user.secrets.password);
      await this.setLastSignedIn(user.email);

      return user;
    } catch {
      throw new BadRequestException('InvalidCredentials');
    }
  }

  async updatePassword(email: string, password: string) {
    const hashedPassword = await this.hash(password);

    await this.userService.updateByEmail(email, {
      secrets: { update: { password: hashedPassword } },
    });
  }

  async resetPassword(token: string, password: string) {
    const hashedPassword = await this.hash(password);

    await this.userService.updateByResetToken(token, {
      resetToken: null,
      password: hashedPassword,
    });
  }



  async verifyEmail(id: string, token: string) {
    const user = await this.userService.findOneById(id);

    const storedToken = user.secrets?.verificationToken;

    if (!storedToken || storedToken !== token) {
      throw new BadRequestException('InvalidVerificationToken');
    }

    await this.userService.updateByEmail(user.email, {
      emailVerified: true,
      secrets: { update: { verificationToken: null } },
    });
  }
}
