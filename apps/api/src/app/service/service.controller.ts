// @ts-nocheck
import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { BatchCreateBusinessSubcategoryDto, CreateBusinessSubcategoryDto } from '@ketero/dto';
import { User } from '../user/decorators/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/utils/role.decorator';
import { Role } from '../auth/utils/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('service')
@UseGuards(JwtGuard, RolesGuard)
export class ServiceController {

    constructor(private readonly businessSubcategoryService: ServiceService) { }

    @Post()
    @UseGuards(JwtGuard)
    @Roles(Role.Business)
    async create(
        @Body() createBusinessSubcategoryDto: CreateBusinessSubcategoryDto,
        @User() user: any,
    ) {
        const userId = user.userId;
        return this.businessSubcategoryService.create(createBusinessSubcategoryDto, userId);
    }

    @Post('bulk')
    @UseGuards(JwtGuard)
    @Roles(Role.Business)
    async createMany(
        @Body() batchCreateDto: BatchCreateBusinessSubcategoryDto,
        @User() user: any,

    ) {
        const userId = user.userId;
        return this.businessSubcategoryService.createMany(batchCreateDto, userId);
    }

    @Patch('bulk')
    @UseGuards(JwtGuard)
    async BulkCreateOrUpdate(
        @Body() dto: { businessSubcategories: CreateBusinessSubcategoryDto[] },
        @User() user: any,

    ) {
        const userId = user.userId;

        if (!dto || !Array.isArray(dto.businessSubcategories)) {
            throw new BadRequestException('Invalid data format');
        }

        try {
            const result = await this.businessSubcategoryService.createOrUpdateMany(dto, userId);
            return {
                message: 'Bulk update successful',
                result,
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    @UseGuards(JwtGuard)  // Example guard to protect the route
    @Get('business/:businessId')
    async getBusinessSubcategories(@Param('businessId') businessId: string) {
        return this.businessSubcategoryService.findAllByBusinessId(businessId);
    }


    @Get()
    async findAll(@User() user: any) {
        const userId = user.userId;
        return this.businessSubcategoryService.findAll(userId);
    }

}