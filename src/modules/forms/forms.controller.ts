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
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { FormsService } from './forms.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@ApiTags('Forms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  @ApiOperation({ summary: 'List all forms (paginated, with search and sort)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Filter by title (case-insensitive)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort by creation date',
  })
  findAll(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('sort') sort?: 'asc' | 'desc',
  ) {
    return this.formsService.findAll(req.user.id, page, limit, search, sort);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a form by ID with questions and options' })
  @ApiResponse({ status: 200, description: 'Form found' })
  @ApiResponse({ status: 404, description: 'Form not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.formsService.findOne(req.user.id, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new form' })
  @ApiResponse({ status: 201, description: 'Form created' })
  create(@Body() createFormDto: CreateFormDto, @Request() req) {
    return this.formsService.create(req.user.id, createFormDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a form' })
  @ApiResponse({ status: 200, description: 'Form updated' })
  @ApiResponse({ status: 404, description: 'Form not found' })
  update(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
    @Request() req,
  ) {
    return this.formsService.update(req.user.id, id, updateFormDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a form' })
  @ApiResponse({ status: 200, description: 'Form deleted' })
  @ApiResponse({ status: 404, description: 'Form not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.formsService.remove(req.user.id, id);
  }
}
