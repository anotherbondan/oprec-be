import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async submit(formId: string, dto: CreateSubmissionDto) {
    const form = await this.prisma.form.findUnique({
      where: { id: formId },
      include: { questions: true },
    });

    if (!form) {
      throw new NotFoundException('Form not found');
    }

    if (form.status !== 'PUBLISHED') {
      throw new BadRequestException(
        'Form is not accepting submissions. Only published forms can receive submissions.',
      );
    }

    const formQuestionIds = new Set(form.questions.map((q) => q.id));
    for (const answer of dto.answers) {
      if (!formQuestionIds.has(answer.questionId)) {
        throw new BadRequestException(
          `Question ${answer.questionId} does not belong to this form`,
        );
      }
    }

    const answeredQuestionIds = new Set(dto.answers.map((a) => a.questionId));
    const missingRequired = form.questions.filter(
      (q) => q.isRequired && !answeredQuestionIds.has(q.id),
    );
    if (missingRequired.length > 0) {
      const missingTexts = missingRequired.map((q) => q.text).join(', ');
      throw new BadRequestException(
        `Missing answers for required questions: ${missingTexts}`,
      );
    }

    return this.prisma.submission.create({
      data: {
        formId,
        answers: {
          create: dto.answers.map((a) => ({
            questionId: a.questionId,
            value: a.value,
          })),
        },
      },
      include: {
        answers: {
          include: { question: true },
        },
      },
    });
  }

  async findAllByForm(userId: string, formId: string, page = 1, limit = 10) {
    const form = await this.prisma.form.findFirst({
      where: { id: formId, userId },
    });

    if (!form) {
      throw new NotFoundException('Form not found');
    }

    const skip = (page - 1) * limit;

    const [submissions, total] = await this.prisma.$transaction([
      this.prisma.submission.findMany({
        where: { formId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          answers: {
            include: { question: true },
          },
        },
      }),
      this.prisma.submission.count({ where: { formId } }),
    ]);

    return {
      data: submissions,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, formId: string, submissionId: string) {
    const form = await this.prisma.form.findFirst({
      where: { id: formId, userId },
    });

    if (!form) {
      throw new NotFoundException('Form not found');
    }

    const submission = await this.prisma.submission.findFirst({
      where: { id: submissionId, formId },
      include: {
        answers: {
          include: { question: true },
        },
      },
    });

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    return submission;
  }
}
