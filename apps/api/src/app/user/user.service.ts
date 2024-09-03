import { UserDto } from '@ketero/dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findOneById(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: { secrets: true, business: true },
    });

    if (!user.secrets) {
      throw new InternalServerErrorException('SecretsNotFound');
    }

    return user;
  }

  async findOneByIdentifier(identifier: string) {
    const user = await (async (identifier: string) => {
      // First, find the user by email
      const user = await this.prisma.user.findUnique({
        where: { email: identifier },
        include: { secrets: true, business: true },
      });

      // If the user exists, return it
      if (user) return user;

      // Otherwise, find the user by email
      // If the user doesn't exist, throw an error
      return this.prisma.user.findUnique({
        where: { username: identifier },
        include: { secrets: true },
      });
    })(identifier);

    return user;
  }

  async findOneByIdentifierOrThrow(identifier: string) {
    const user = await (async (identifier: string) => {
      // First, find the user by email
      const user = await this.prisma.user.findUnique({
        where: { email: identifier },
        include: { secrets: true },
      });

      // If the user exists, return it
      if (user) return user;

      // Otherwise, find the user by username
      // If the user doesn't exist, throw an error
      return this.prisma.user.findUniqueOrThrow({
        where: { username: identifier },
        include: { secrets: true },
      });
    })(identifier);

    return user;
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
      include: { secrets: true, business: true },
    });
  }

  updateByEmail(email: string, data: Prisma.UserUpdateArgs['data']) {
    return this.prisma.user.update({ where: { email }, data });
  }

  updateByID(userId: string, data: Prisma.UserUpdateArgs['data']) {
    return this.prisma.user.update({ where: { id: userId }, data });
  }
  async checkUserByPhoneNumber(phoneNumber: string): Promise<UserDto | null> {
    return this.prisma.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
      },
    }) as any;
  }
  async updateByResetToken(
    resetToken: string,
    data: Prisma.SecretsUpdateArgs['data']
  ) {
    await this.prisma.secrets.update({ where: { resetToken }, data });
  }
}
