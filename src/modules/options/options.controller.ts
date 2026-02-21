import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  create(@CurrentUser() user, @Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(user.id, createOptionDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionsService.update(user.id, id, updateOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user) {
    return this.optionsService.remove(user.id, id);
  }
}
