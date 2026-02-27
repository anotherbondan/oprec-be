import {
  Controller,
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
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Option } from './entities/option.entity';

@ApiTags('Options')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an option for a question' })
  @ApiResponse({ status: 201, description: 'Option created', type: Option })
  @ApiResponse({ status: 404, description: 'Question not found' })
  create(@Request() req, @Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(req.user.id, createOptionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an option' })
  @ApiResponse({ status: 200, description: 'Option updated', type: Option })
  @ApiResponse({ status: 404, description: 'Option not found' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionsService.update(req.user.id, id, updateOptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an option' })
  @ApiResponse({ status: 200, description: 'Option deleted' })
  @ApiResponse({ status: 404, description: 'Option not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.optionsService.remove(req.user.id, id);
  }
}
