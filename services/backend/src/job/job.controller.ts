import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { JobDTO, JobQueryDTO } from './job.dto'
import { JobService } from './job.service'

@UsePipes(ValidationPipe)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @HttpCode(HttpStatus.OK)
  @Post('list')
  list(@Body() body: JobQueryDTO) {
    return this.jobService.all(body)
  }

  @HttpCode(HttpStatus.OK)
  @Put('save')
  edit(@Body() body: JobDTO) {
    return this.jobService.save(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.jobService.del(id)
  }
}
