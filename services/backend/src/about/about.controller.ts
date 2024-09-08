import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Render,
  UseInterceptors
} from '@nestjs/common'

import { Public } from '@/decorator/public'

import { AboutDTO, AboutEditDTO } from './about.dto'
import { AboutService } from './about.service'

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Public()
  @Get()
  @UseInterceptors(CacheInterceptor)
  @Render('about')
  render() {
    return this.aboutService.data()
  }

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: AboutDTO[]) {
    return this.aboutService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit')
  edit(@Body() body: AboutEditDTO) {
    return this.aboutService.edit(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.aboutService.del(id)
  }
}
