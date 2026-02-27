import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Submission } from './entities/submission.entity';

@ApiTags('Submissions')
@Controller('forms/:formId/submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit answers to a published form (public)' })
  @ApiResponse({
    status: 201,
    description: 'Submission created',
    type: Submission,
  })
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
  @ApiResponse({
    status: 200,
    description: 'Submissions listed',
    type: [Submission],
  })
  @ApiResponse({ status: 404, description: 'Form not found' })
  findAll(@Param('formId') formId: string, @Request() req) {
    return this.submissionsService.findAllByForm(req.user.id, formId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single submission (owner only)' })
  @ApiResponse({
    status: 200,
    description: 'Submission found',
    type: Submission,
  })
  @ApiResponse({ status: 404, description: 'Form or submission not found' })
  findOne(
    @Param('formId') formId: string,
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.submissionsService.findOne(req.user.id, formId, id);
  }
}
