import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@UseGuards(JwtAuthGuard)
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  findAll(
    @Request() req,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.formsService.findAll(req.user.id, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.formsService.findOne(req.user.id, id);
  }

  @Post()
  create(@Body() createFormDto: CreateFormDto, @Request() req) {
    return this.formsService.create(req.user.id, createFormDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
    @Request() req,
  ) {
    return this.formsService.update(req.user.id, id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.formsService.remove(req.user.id, id);
  }
}
