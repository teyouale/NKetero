import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { PhoneNumberSchema, UpdateUserDto, UserDto } from '@ketero/dto';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Get('me')
  @UseGuards(JwtGuard)
  fetch(@User() user: UserDto) {
    return user;
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  async update(
    @User() user: any,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const userId = user.userId
    try {
      return await this.userService.updateByID(userId, updateUserDto);
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
  @Get('checkuser')
  async checkUserByPhone(@Query('phoneNumber') phoneNumber: string) {
    const result = PhoneNumberSchema.safeParse(phoneNumber);
    if (!result.success) {
      throw new BadRequestException('Invalid phone number');
    }

    const user = await this.userService.checkUserByPhoneNumber(phoneNumber);
    return user || null;
  }

  // @Delete('me')
  // // @UseGuards(TwoFactorGuard)
  // async delete(
  //   @User('id') id: string,
  //   @Res({ passthrough: true }) response: Response
  // ) {
  //   await this.userService.deleteOneById(id);

  //   response.clearCookie('Authentication');
  //   response.clearCookie('Refresh');

  //   response.status(200).send({ message: 'Sorry to see you go, goodbye!' });
  // }
}