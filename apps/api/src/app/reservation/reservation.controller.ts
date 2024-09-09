import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';

import { RolesGuard } from '../auth/guards/role.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  CreateReservationDto,
  CreateUserReservationDto,
  GetBusinessesReservationDto,
  UpdateReservationDto,
} from '@ketero/dto';
import { Roles } from '../auth/utils/role.decorator';
import { Role } from '../auth/utils/role.enum';
import { User } from '../user/decorators/user.decorator';

@Controller('reservations')
@UseGuards(JwtGuard, RolesGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Get()
  async getAllBusinesses(): Promise<GetBusinessesReservationDto[]> {
    return this.reservationService.getAllBusinessesReservation();
  }

  @Post()
  @Roles(Role.Client, Role.VirtualAssistant)
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Post('/user')
  @Roles(Role.Client, Role.VirtualAssistant)
  async createUserReservation(
    @Body() createUserReservation: CreateUserReservationDto
  ) {
    return this.reservationService.createUserAndReservation(
      createUserReservation
    );
  }

  @Get('business')
  @UseGuards(JwtGuard)
  @Roles(Role.Business)
  async getMyReservations(@User() user: any, @Param('businessId') businessId: string) {
    const userId = user.userId;
    return this.reservationService.getMyBusinessReservations(userId);
  }

  @Get('business/:businessId')
  @Roles(Role.Business, Role.VirtualAssistant)
  async getReservationsByBusiness(@Param('businessId') businessId: string) {
    return this.reservationService.getReservationsByBusiness(businessId);
  }
  @Get('client/:clientId')
  @Roles(Role.Client)
  async getReservationsByClient(@Param('clientId') clientId: string) {
    return this.reservationService.getReservationsByClient(clientId);
  }

  @Put(':reservationId/status')
  @Roles(Role.Business, Role.VirtualAssistant)
  async updateReservationStatus(
    @Param('reservationId') reservationId: string,
    @Body('status') status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  ) {
    return this.reservationService.updateReservationStatus(
      reservationId,
      status
    );
  }

  // @Get(':reservationId')
  // @Roles(Role.Client, Role.Business, Role.VirtualAssistant)
  // async getReservation(
  //   @Param('reservationId') reservationId: string,
  //   @Request() req: any
  // ) {
  //   return this.reservationService.getReservation(reservationId);
  // }

  // @Put(':reservationId')
  // @Roles(Role.Client, Role.Business, Role.VirtualAssistant)
  // async updateReservation(
  //   @Param('reservationId') reservationId: string,
  //   @Body() updateReservationDto: UpdateReservationDto
  // ) {
  //   return this.reservationService.updateReservation(
  //     reservationId,
  //     updateReservationDto
  //   );
  // }

  // @Delete(':reservationId')
  // @Roles(Role.Client, Role.Business, Role.VirtualAssistant)
  // async deleteReservation(@Param('reservationId') reservationId: string) {
  //   return this.reservationService.deleteReservation(reservationId);
  // }

  // @Get('business/:businessId')
  // @Roles(Role.Business)
  // async getReservationsByBusiness(@Param('businessId') businessId: string) {
  //   return this.reservationService.getReservationsByBusiness(businessId);
  // }
}
