import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { JobService } from './job.service'
import { JobDTO, JobEditDTO } from './job.dto'

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: JobDTO) {
    return this.jobService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit/:id')
  edit(@Body() body: JobEditDTO) {
    return this.jobService.edit(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.jobService.del(id)
  }
}
