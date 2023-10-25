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
  Render
} from '@nestjs/common'
import { AboutService } from './about.service'
import { AboutDTO, AboutEditDTO } from './about.dto'

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
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
