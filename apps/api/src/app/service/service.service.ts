// @ts-nocheck
import { CreateBusinessSubcategoryDto } from '@ketero/dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ServiceService {

    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateBusinessSubcategoryDto, userId: string) {
        const business = await this.findBusinessByUserId(userId);
        if (!business) {
            throw new Error('Business not found');
        }

        return this.prisma.businessSubcategory.create({
            data: {
                ...dto,
                businessId: business.id,
            },
        });
    }

    async createMany(dto: { businessSubcategories: CreateBusinessSubcategoryDto[] }, userId: string) {
        const business = await this.findBusinessByUserId(userId);
        if (!business) {
            throw new Error('Business not found');
        }
        return this.prisma.businessSubcategory.createMany({
            data: dto.businessSubcategories.map(subcategory => ({
                ...subcategory,
                businessId: business.id
            })),
        });
    }


    async createOrUpdateMany(dto: { businessSubcategories: CreateBusinessSubcategoryDto[] }, userId: string) {
        // Find the business associated with the user
        const business = await this.findBusinessByUserId(userId);
        if (!business) {
            throw new Error('Business not found');
        }

        // return business

        // Extract businessSubcategories from DTO and add businessId
        const subcategoriesWithBusinessId = dto.businessSubcategories.map(subcategory => ({
            ...subcategory,
            businessId: business.id
        }));

        // Fetch existing BusinessSubcategory records for the business
        const existingSubcategories = await this.prisma.businessSubcategory.findMany({
            where: { businessId: business.id },
            select: { subcategoryId: true } // Assuming `subcategoryId` is the unique identifier
        });

        const existingSubcategoryIds = new Set(existingSubcategories.map(sub => sub.subcategoryId));

        // Separate into create and update operations
        const toCreate = subcategoriesWithBusinessId.filter(subcategory => !existingSubcategoryIds.has(subcategory.subcategoryId));
        const toUpdate = subcategoriesWithBusinessId.filter(subcategory => existingSubcategoryIds.has(subcategory.subcategoryId));

        // Perform bulk operations
        const created = toCreate.length ? await this.prisma.businessSubcategory.createMany({
            data: toCreate
        }) : { count: 0 };

        const updated = toUpdate.length ? await Promise.all(
            toUpdate.map(subcategory =>
                this.prisma.businessSubcategory.update({
                    where: { businessId_subcategoryId: { businessId: business.id, subcategoryId: subcategory.subcategoryId } },
                    data: { price: subcategory.price } // Update only the price or other fields as needed
                })
            )
        ) : [];

        return {
            created: created.count,
            updated: updated.length
        };
    }

    async findAll(userId: string) {
        // Find the business associated with the user
        const business = await this.findBusinessByUserId(userId);
        if (!business) {
            throw new Error('Business not found');
        }

        // Retrieve all BusinessSubcategory records for the business
        const businessSubcategories = await this.prisma.businessSubcategory.findMany({
            where: { businessId: business.id },
            include: {
                subcategory: true, // Include subcategory details to get the label
            },
        });

        // Map and transform the response format
        return businessSubcategories.map(subcategory => ({
            value: subcategory.subcategoryId,
            label: subcategory.subcategory.name,
            price: subcategory.price
        }));
    }

    async findAllByBusinessId(businessId: string) {
        const businessSubcategories = await this.prisma.businessSubcategory.findMany({
            where: {
                businessId: businessId,
            },
            include: {
                subcategory: true,  // Include the related subcategory details if necessary
            },
        });

        return businessSubcategories.map((subcategory) => ({
            subcategoryId: subcategory.subcategoryId,
            label: subcategory.subcategory.name,  // Assuming the name is stored in the subcategory entity
            price: subcategory.price,
        }));
    }


    // Userid -> BusinessID
    async findBusinessByUserId(userId: string) {
        return await this.prisma.business.findUnique({
            where: {
                userId: userId,
            },
        });
    }

}