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
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('Questions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a question for a form' })
  @ApiResponse({ status: 201, description: 'Question created' })
  @ApiResponse({ status: 404, description: 'Form not found' })
  create(@Body() createQuestionDto: CreateQuestionDto, @Request() req) {
    return this.questionsService.create(req.user.id, createQuestionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiResponse({ status: 200, description: 'Question found' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.questionsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiResponse({ status: 200, description: 'Question updated' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Request() req,
  ) {
    return this.questionsService.update(req.user.id, id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({ status: 200, description: 'Question deleted' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.questionsService.remove(req.user.id, id);
  }
}
