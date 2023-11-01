import { Controller, Get, ParseIntPipe, Query, Render } from '@nestjs/common'
import { DetailService } from './detail.service'

@Controller('product/detail')
export class DetailController {
  constructor(private detailService: DetailService) {}

  @Get()
  @Render('product_detail')
  render(@Query('id', new ParseIntPipe()) id: number) {
    return this.detailService.data(id)
  }
}
