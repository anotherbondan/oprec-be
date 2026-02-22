import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormStatus } from '../../generated/prisma/enums';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateFormDto) {
    return this.prisma.form.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        userId,
      },
      include: {
        questions: true,
      },
    });
  }

  async findAll(
    userId: string,
    page = 1,
    limit = 10,
    search?: string,
    sort: 'asc' | 'desc' = 'desc',
    status?: FormStatus,
  ) {
    const skip = (page - 1) * limit;

    const where = {
      userId,
      ...(search && {
        title: { contains: search, mode: 'insensitive' as const },
      }),
      ...(status && { status }),
    };

    const [forms, total] = await this.prisma.$transaction([
      this.prisma.form.findMany({
        where,
        orderBy: { createdAt: sort },
        skip,
        take: limit,
        include: {
          _count: { select: { questions: true } },
        },
      }),
      this.prisma.form.count({ where }),
    ]);

    return {
      data: forms,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, formId: string) {
    const form = await this.prisma.form.findUnique({
      where: { id: formId },
      include: {
        questions: {
          include: { options: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!form) {
      throw new NotFoundException('Form not found');
    }

    if (form.userId === userId) {
      return form;
    }

    if (form.status !== FormStatus.PUBLISHED) {
      throw new NotFoundException('Form not published yet');
    }

    return form;
  }

  async update(userId: string, id: string, dto: UpdateFormDto) {
    const existing = await this.prisma.form.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new NotFoundException('Form not found');
    }

    return this.prisma.form.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: {
            options: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  }

  async remove(userId: string, id: string) {
    const existing = await this.prisma.form.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new NotFoundException('Form not found');
    }

    await this.prisma.form.delete({
      where: { id },
    });

    return { message: 'Form deleted successfully' };
  }
}
