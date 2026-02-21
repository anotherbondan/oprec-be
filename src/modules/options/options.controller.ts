import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Options')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an option for a question' })
  @ApiResponse({ status: 201, description: 'Option created' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  create(@CurrentUser() user, @Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(user.id, createOptionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an option' })
  @ApiResponse({ status: 200, description: 'Option updated' })
  @ApiResponse({ status: 404, description: 'Option not found' })
  update(
    @Param('id') id: string,
    @CurrentUser() user,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionsService.update(user.id, id, updateOptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an option' })
  @ApiResponse({ status: 200, description: 'Option deleted' })
  @ApiResponse({ status: 404, description: 'Option not found' })
  remove(@Param('id') id: string, @CurrentUser() user) {
    return this.optionsService.remove(user.id, id);
  }
}
