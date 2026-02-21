import {
  Controller,
  Get,
  Post,
  Body,
  Param,
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
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('Submissions')
@Controller('forms/:formId/submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit answers to a published form (public)' })
  @ApiResponse({ status: 201, description: 'Submission created' })
  @ApiResponse({
    status: 400,
    description: 'Form not published or validation failed',
  })
  @ApiResponse({ status: 404, description: 'Form not found' })
  submit(@Param('formId') formId: string, @Body() dto: CreateSubmissionDto) {
    return this.submissionsService.submit(formId, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List submissions for a form (owner only)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Submissions listed' })
  @ApiResponse({ status: 404, description: 'Form not found' })
  findAll(
    @Param('formId') formId: string,
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.submissionsService.findAllByForm(
      req.user.id,
      formId,
      page,
      limit,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single submission (owner only)' })
  @ApiResponse({ status: 200, description: 'Submission found' })
  @ApiResponse({ status: 404, description: 'Form or submission not found' })
  findOne(
    @Param('formId') formId: string,
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.submissionsService.findOne(req.user.id, formId, id);
  }
}
