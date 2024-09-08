import { CacheInterceptor } from '@nestjs/cache-manager'
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Render, UseInterceptors } from '@nestjs/common'

import { Public } from '@/decorator/public'

import { ContactDTO, ContactEditDTO } from './contact.dto'
import { ContactService } from './contact.service'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Get()
  @UseInterceptors(CacheInterceptor)
  @Render('contact')
  render() {
    return this.contactService.data()
  }

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: ContactDTO[]) {
    return this.contactService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit')
  edit(@Body() body: ContactEditDTO) {
    return this.contactService.edit(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(id: number) {
    return this.contactService.del(id)
  }
}
