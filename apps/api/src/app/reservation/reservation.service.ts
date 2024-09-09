import {
  CreateReservationDto,
  CreateUserReservationDto,
  GetBusinessesReservationDto,
  RegisterDto,
} from '@ketero/dto';
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'nestjs-prisma';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/utils/role.enum';
import { z } from 'zod';

@Injectable()
export class ReservationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService
  ) { }
  private reservationSchema = z.object({
    status: z
      .enum(['PENDING', 'CONFIRMED', 'CANCELLED'])
      .optional()
      .default('PENDING'),
  });

  async createReservation(createReservationDto: CreateReservationDto) {
    const { businessId, clientId, service, date, price } = createReservationDto;

    return this.prisma.reservation.create({
      data: {
        businessId,
        clientId,
        service,
        price,
        date: new Date(date).toISOString(),
        status: 'PENDING',
      },
    });
  }

  async createUserAndReservation(
    createUserReservation: CreateUserReservationDto
  ) {
    const newclientUser: RegisterDto = {
      role: Role.Client,
      password: 'abcd1234',
      email: createUserReservation.email,
      username: createUserReservation.username,
      name: createUserReservation.name,
      phoneNumber: createUserReservation.phoneNumber,
    };
    const client = await this.authService.register(newclientUser);

    const output: CreateReservationDto = {
      price: 0,
      businessId: createUserReservation.businessId,
      clientId: client.id,
      service: createUserReservation.service,
      date: createUserReservation.date,
    };
    return await this.createReservation(output);
  }

  // async getReservation(reservationId: string) {
  //   return this.prisma.reservation.findUnique({
  //     where: { id: reservationId },
  //   });
  // }

  // async updateReservation(
  //   reservationId: string,
  //   updateReservationDto: UpdateReservationDto
  // ) {
  //   return this.prisma.reservation.update({
  //     where: { id: reservationId },
  //     data: updateReservationDto,
  //   });
  // }

  // async deleteReservation(reservationId: string) {
  //   return this.prisma.reservation.delete({
  //     where: { id: reservationId },
  //   });
  // }

  async getReservationsByClient(clientId: string) {
    return this.prisma.reservation.findMany({
      where: { clientId },
    });
  }

  async getReservationsByBusiness(businessId: string) {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: {
        reservation: {
          include: {
            client: true
          }
        }
      }
    });

    if (!business) {
      throw new NotFoundException('No business found with this ID');
    }

    return business;
  }
  async getMyBusinessReservations(userId: string) {
    const business = await this.prisma.business.findUnique({
      where: { userId },
      include: {
        reservation: {
          include: {
            client: true
          }
        }
      },
    });

    if (!business) {
      throw new NotFoundException('No business found for this user');
    }
    return business;
  }

  async updateReservationStatus(
    reservationId: string,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  ) {
    return this.prisma.reservation.update({
      where: { id: reservationId },
      data: { status },
    });
  }

  async getAllBusinessesReservation(): Promise<GetBusinessesReservationDto[]> {
    const businesses = await this.prisma.business.findMany({
      include: {
        user: true,
        reservation: true,
      },
    });

    return businesses
      .map((business) => {
        const pendingReservationsCount = business.reservation.filter(
          (res) => res.status === 'PENDING'
        ).length;

        const activeReservationsCount = business.reservation.filter(
          (res) => res.status === 'CONFIRMED'
        ).length;

        return {
          name: business.name,
          email: business.user.email,
          phoneNumber: business.user.phoneNumber,
          workingHours: business.workingHours,
          ownerName: business.user.name,
          location: business.location,
          description: business.description,
          businessId: business.id,
          pendingReservationsCount,
          activeReservationsCount,
        };
      })
      .filter((business) => business.pendingReservationsCount > 0) as any;
  }
}
