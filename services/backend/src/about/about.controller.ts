import { Controller, Get, Render } from '@nestjs/common'
import { AboutService } from './about.service'

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @Render('about')
  render() {
    return this.aboutService.data()
  }
}
