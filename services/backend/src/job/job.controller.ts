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
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { JobService } from './job.service'
import { JobDTO, JobQueryDTO } from './job.dto'
import { AuthGuard } from '@/auth/auth.guard'

@UsePipes(ValidationPipe)
@UseGuards(AuthGuard)
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
