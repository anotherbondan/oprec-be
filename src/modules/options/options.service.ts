import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionsService {
  constructor(private readonly prisma: PrismaService) {}


  async create(userId: string, dto: CreateOptionDto) {
    const question = await this.prisma.question.findFirst({
      where: {
        id: dto.questionId,
        form: {
          userId,
        },
      },
      include: {
        options: true,
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const nextOrder = question.options.length;

    return this.prisma.option.create({
      data: {
        questionId: dto.questionId,
        text: dto.text,
        order: nextOrder,
      },
    });
  }


  async findOne(userId: string, id: string) {
    const option = await this.prisma.option.findFirst({
      where: {
        id,
        question: {
          form: {
            userId,
          },
        },
      },
    });

    if (!option) {
      throw new NotFoundException('Option not found');
    }

    return option;
  }


  async update(userId: string, id: string, dto: UpdateOptionDto) {
    const option = await this.prisma.option.findFirst({
      where: {
        id,
        question: {
          form: {
            userId,
          },
        },
      },
    });

    if (!option) {
      throw new NotFoundException('Option not found');
    }

    return this.prisma.option.update({
      where: { id },
      data: {
        text: dto.text,
      },
    });
  }


  async remove(userId: string, id: string) {
    const option = await this.prisma.option.findFirst({
      where: {
        id,
        question: {
          form: {
            userId,
          },
        },
      },
    });

    if (!option) {
      throw new NotFoundException('Option not found');
    }

    await this.prisma.option.delete({
      where: { id },
    });

    return { message: 'Option deleted successfully' };
  }
}