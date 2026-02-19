import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.form.create({ data });
  }

  findAll() {
    return this.prisma.form.findMany();
  }

  findOne(id: string) {
    return this.prisma.form.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.form.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.form.delete({ where: { id } });
  }
}