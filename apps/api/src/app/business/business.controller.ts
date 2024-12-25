// @ts-nocheck
import {
  BadRequestException,
  InternalServerErrorException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Put,
  Request,
  ForbiddenException,
  Param,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/utils/role.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import {
  BusinessDto,
  CreateBusinessUserDto,
  RegisterDto,
  UpdateBusinessDto,
  UserDto,
} from '@ketero/dto';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/utils/role.enum';
import { password } from 'nestjs-zod/z';

@Controller('business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly authService: AuthService
  ) { }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  async getAllBusinesses(@Request() req) {
    const user = req.user; // Assuming req.user contains the decoded JWT payload
    // Check user role and return the appropriate response
    if (user.role === Role.Business) {
    // console.log(user.userId)
      return this.businessService.getMyBusinesses(user.userId);
    } else if (
      user.role === Role.VirtualAssistant ||
      user.role === Role.Client
    ) {
      return this.businessService.getAllBusinesses();
    }

    throw new ForbiddenException('Access denied');
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  async getBusinessById(@Param('id') id: string, @Request() req) {
    const user = req.user;

    // You might want to check if the user has permission to access this business
    const business = await this.businessService.getBusinessById(id);

    if (!business) {
      throw new BadRequestException('Business not found');
    }

    // Additional checks for roles can be done here if needed
    if (user.role === Role.Business && business.userId !== user.userId) {
      throw new ForbiddenException('Access denied');
    }

    return business;
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.VirtualAssistant)
  async createBusinessUser(@Body() businessUser: CreateBusinessUserDto) {
    // return "Hello"
    try {
      const newbusinessUser: RegisterDto = {
        role: Role.Business,
        password: 'abcd1234',
        email: businessUser.user.email,
        username: businessUser.user.username,
        name: businessUser.user.name,
        phoneNumber: businessUser.user.phoneNumber,
        business: {
          location: businessUser.location,
        },
        managerId: businessUser.managerId
      };

      const output: any = await this.authService.register(newbusinessUser);

      if (!output) {
        throw new InternalServerErrorException(
          'Failed to register business user'
        );
      }

      const user: any = {
        id: output.id,
        email: output.email,
        username: output.username,
        role: output.role,
        name: output.name,
        phoneNumber: output.phoneNumber,
        emailVerified: output.emailVerified,
        createdAt: new Date(output.createdAt),
        updatedAt: new Date(output.updatedAt),
      };

      const business = {
        id: output.business.id,
        name: output.business.name,
        description: output.business.description,
        workingHours: output.business.workingHours,
        location: output.business.location,
        user: user,
      };

      return business;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message);
      } else {
        console.log(error)
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  @Put()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.VirtualAssistant, Role.Business)
  async updateBusinessProfile(@Body() businessProfile: UpdateBusinessDto) {
    return this.businessService.updateBusinessProfile(businessProfile);
  }
}
