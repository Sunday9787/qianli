import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Render, UseInterceptors } from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { ContactService } from './contact.service'
import { ContactDTO, ContactEditDTO } from './contact.dto'
import { ContactFeedbackDTO } from './contact.feedback.dto'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

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

  @HttpCode(HttpStatus.OK)
  @Put('feedback')
  feedback(@Body() body: ContactFeedbackDTO) {
    return this.contactService.feedback(body)
  }
}
