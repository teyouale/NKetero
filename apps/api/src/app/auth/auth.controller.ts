import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import {
  authResponseSchema,
  messageSchema,
  RegisterDto,
  UserWithSecrets,
} from '@ketero/dto';
import type { Response } from 'express';
import { User } from '../user/decorators/user.decorator';
import { AuthService } from './auth.service';
import { getCookieOptions } from './utils/cookie';
import { payloadSchema } from './utils/payload';
import { TwoFactorGuard } from './guards/two-factor.guard';
import { LocalGuard } from './guards/local.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { Role } from './utils/role.enum';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './utils/role.decorator';
import { JwtGuard } from './guards/jwt.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) { }

  private async exchangeToken(
    id: string,
    email: string,
    role: string,
    isTwoFactorAuth = false
  ) {
    try {
      const payload = payloadSchema.parse({ id, isTwoFactorAuth, role });

      const accessToken = this.authService.generateToken('access', payload);
      const refreshToken = this.authService.generateToken('refresh', payload);
      // Set Refresh Token in Database
      await this.authService.setRefreshToken(id, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new InternalServerErrorException(error, 'SomethingWentWrong');
    }
  }

  private async handleAuthenticationResponse(
    user: UserWithSecrets,
    response: Response,
    isTwoFactorAuth = false,
    redirect = false
  ) {
    let status = 'authenticated';

    const baseUrl = this.configService.get('PUBLIC_URL');
    const redirectUrl = new URL(`${baseUrl}/auth/callback`);
    const { accessToken, refreshToken } = await this.exchangeToken(
      user.id,
      user.email,
      user.role,
      isTwoFactorAuth
    );

    response.cookie('Authentication', accessToken, getCookieOptions('access'));
    response.cookie('Refresh', refreshToken, getCookieOptions('refresh'));

    const responseData = authResponseSchema.parse({ status, user });

    redirectUrl.searchParams.set('status', status);

    if (redirect) response.redirect(redirectUrl.toString());
    else response.status(200).send(responseData);
  }

  @Get('business')
  @UseGuards(JwtGuard, RolesGuard)
  // @UseGuards(JwtGuard)
  @Roles(Role.Client)
  getBusinessData(@User() user: UserWithSecrets) {
    return user;
  }
  @Get('client')
  @UseGuards(JwtGuard)
  getclientData() {
    return 'This route can only be accessed by business users';
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.register(registerDto);
    return this.handleAuthenticationResponse(user, response);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @User() user: UserWithSecrets,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.handleAuthenticationResponse(user, response);
  }



  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(
    @User() user: UserWithSecrets,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.handleAuthenticationResponse(user, response, true);
  }


  @Post("logout")
  @UseGuards(JwtGuard)
  async logout(@User() user, @Res({ passthrough: true }) response: Response) {
    console.log(user)
    await this.authService.setRefreshToken(user.userId, null);

    response.clearCookie("Authentication");
    response.clearCookie("Refresh");

    const data = messageSchema.parse({ message: "You have been logged out, tschüss!" });
    response.status(200).send(data);
  }
}