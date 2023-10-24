import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { JobService } from './job.service'
import { JobDTO, JobUpdateDTO } from './job.dto'

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: JobDTO) {
    return this.jobService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('update/:id')
  update(@Body() body: JobUpdateDTO) {
    return this.jobService.update(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.jobService.del(id)
  }
}
