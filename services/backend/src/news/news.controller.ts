import { Controller, Get, Render } from '@nestjs/common'
import { NewsService } from './news.service'

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @Render('news')
  render() {
    return this.newsService.data()
  }
}
