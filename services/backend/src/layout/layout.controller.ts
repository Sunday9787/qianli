import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'

import { LayoutDTO, LayoutEditDTO } from './layout.dto'
import { LayoutService } from './layout.service'

@Controller('layout')
export class LayoutController {
  constructor(private layoutService: LayoutService) {}

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: LayoutDTO) {
    return this.layoutService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit')
  edit(@Body() body: LayoutEditDTO) {
    return this.layoutService.edit(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.layoutService.del(id)
  }
}
