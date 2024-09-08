import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, ParseIntPipe, Query, Render, UseInterceptors } from '@nestjs/common'

import { Public } from '@/decorator/public'

import { DetailService } from './detail.service'

@Controller('product/detail')
export class DetailController {
  constructor(private detailService: DetailService) {}

  @Public()
  @Get()
  @UseInterceptors(CacheInterceptor)
  @Render('product_detail')
  render(@Query('id', new ParseIntPipe()) id: number) {
    return this.detailService.data(id)
  }
}
