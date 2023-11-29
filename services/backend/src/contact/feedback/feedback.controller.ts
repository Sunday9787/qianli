import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { FeedbackService } from './feedback.service'
import { FeedbackDTO, FeedbackQueryDTO } from './feedback.dto'

@UsePipes(ValidationPipe)
@Controller('contact/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @HttpCode(HttpStatus.OK)
  @Put()
  feedback(@Body() body: FeedbackDTO) {
    this.feedbackService.save(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @Post('list')
  list(@Body() body: FeedbackQueryDTO) {
    return this.feedbackService.all(body)
  }

  @HttpCode(HttpStatus.OK)
  @Put('save')
  save(@Body() body: FeedbackDTO) {
    return this.feedbackService.save(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('process/:id')
  process(@Param('id', new ParseIntPipe()) id: number) {
    return this.feedbackService.process(id)
  }
}
