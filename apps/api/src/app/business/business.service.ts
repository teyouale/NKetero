// @ts- 
import { RegisterDto, UpdateBusinessDto } from '@ketero/dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Role } from '../auth/utils/role.enum';
import { password } from 'nestjs-zod/z';

@Injectable()
export class BusinessService {
  getBusinessById(businessId: string) {
    return this.prisma.business.findUnique({
      where: {
        id: businessId,
      },
      include: {
        user: true,
      },
    });
  }
  getMyBusinesses(userId) {
    return this.prisma.business.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
  }
  async updateBusinessProfile(businessProfile: UpdateBusinessDto) {
    try {
      return await this.prisma.business.update({
        where: { id: businessProfile.id },
        data: {
          name: businessProfile.name,
          description: businessProfile.description,
          workingHours: businessProfile.workingHours,
          location: businessProfile.location,
        },
        include: {
          user: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        // P2025 is the error code for "Record to update not found"
        throw new HttpException(
          'Business profile not found',
          HttpStatus.NOT_FOUND
        );
      }
      throw new HttpException(
        'Failed to update business profile',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  constructor(private prisma: PrismaService) { }
  async getAllBusinesses() {
    return this.prisma.business.findMany({
      include: {
        user: true,
      },
    });
  }
}
