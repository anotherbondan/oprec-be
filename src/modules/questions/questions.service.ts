import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateQuestionDto) {
    const form = await this.prisma.form.findFirst({
      where: { id: dto.formId, userId },
      include: { questions: true },
    });

    if (!form) {
      throw new NotFoundException('Form not found');
    }

    const nextOrder = dto.order ?? form.questions.length;

    return this.prisma.question.create({
      data: {
        formId: dto.formId,
        text: dto.text,
        type: dto.type,
        isRequired: dto.isRequired ?? false,
        order: nextOrder,
        ...(dto.options && {
          options: {
            create: dto.options.map((opt, index) => ({
              text: opt.text,
              order: index,
            })),
          },
        }),
      },
      include: {
        options: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.question.findMany({
      include: {
        options: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findOne(userId: string, id: string) {
    const question = await this.prisma.question.findFirst({
      where: {
        id,
        form: { userId },
      },
      include: {
        options: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question;
  }

  async update(userId: string, id: string, dto: UpdateQuestionDto) {
    const question = await this.prisma.question.findFirst({
      where: {
        id,
        form: { userId },
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return this.prisma.question.update({
      where: { id },
      data: {
        ...(dto.text !== undefined && { text: dto.text }),
        ...(dto.type !== undefined && { type: dto.type }),
        ...(dto.isRequired !== undefined && { isRequired: dto.isRequired }),
        ...(dto.order !== undefined && { order: dto.order }),
      },
      include: {
        options: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async remove(userId: string, id: string) {
    const question = await this.prisma.question.findFirst({
      where: {
        id,
        form: { userId },
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    await this.prisma.question.delete({
      where: { id },
    });

    return { message: 'Question deleted successfully' };
  }
}
